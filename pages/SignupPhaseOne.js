import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import {
  MagicContext,
  UserInfoContext,
  TokenContext,
} from '../components/Store';
import Layout from '../components/Layout';

import SkillsCard from '../components/SkillsCard';

import Button from '../components/Button';
import NicknameSelection from '../components/NicknameSelection';
import { getUserJourney, removeUserJourney } from '../utils/userJourneyManager';
import communitiesABI from '../utils/communitiesRegistryAbi.json';
import contractABI from '../utils/communityContractAbi.json';

function SignupPhaseOne(props) {
  const [userInfo = { skills: [] }, setUserInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  const [skillTree, setSkillTree] = useState([]);
  const [token, setToken] = useContext(TokenContext);
  const [loading, setLoading] = useState({
    status: false,
    message: null,
  });

  console.log(userInfo);

  useEffect(() => {
    let { category } = userInfo;
    let paramName = 'skill';
    const userJourney = getUserJourney();
    let journey = null;
    let meta = null;
    if (userJourney) {
      journey = userJourney.journey;
      meta = userJourney.meta;
    }
    if (journey === 'community') {
      category = encodeURIComponent(meta.category);
      paramName = 'category';
    }
    if (journey === 'invite') {
      category = encodeURIComponent(userInfo.category);
      paramName = 'category';
    }
    console.log(category);

    const getSkillTree = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/skill?${paramName}=${category}`,
          { method: 'GET' },
        );
        const skillTree = await response.json();
        const skillTreeCategories = skillTree.categories;
        setSkillTree(skillTreeCategories);
      } catch (err) {
        console.log(err);
      }
    };
    getSkillTree();
  }, []);

  const selectSkill = (categoryIndex, selectedSkillIndex) => {
    const updateSkills = category =>
      category.skills.map((skill, skillIndex) => {
        if (skillIndex === selectedSkillIndex) {
          const newSkill =
            typeof skill === 'string'
              ? { skill, selected: !skill.selected }
              : { ...skill, selected: !skill.selected };
          return { ...newSkill };
        }

        return typeof skill === 'string' ? { skill } : { ...skill };
      });

    const copySkills = category =>
      category.skills.map(skill => {
        return typeof skill === 'string' ? { skill } : { ...skill };
      });

    const updateSkillTree = _skillTree =>
      _skillTree.map((category, i) => {
        if (i === categoryIndex) {
          return { ...category, skills: updateSkills(category) };
        }
        return {
          ...category,
          skills: copySkills(category),
        };
      });

    setSkillTree(updateSkillTree(skillTree));
  };

  function setSkillLevel(catIndex, skillIndex, level) {
    const updateSkills = category =>
      category.skills.map((skill, skIndex) => {
        if (skIndex === skillIndex) {
          return { ...skill, level };
        }
        return { ...skill };
      });

    const copySkills = category =>
      category.skills.map(skill => {
        return { ...skill };
      });

    const updateSkillTree = _skillTree =>
      _skillTree.map((category, categoryIndex) => {
        if (categoryIndex === catIndex) {
          return {
            ...category,
            skills: updateSkills(category),
          };
        }
        return {
          ...category,
          skills: copySkills(category),
        };
      });
    setSkillTree(updateSkillTree(skillTree));
  }

  function getSelectedSkills() {
    const skills = [];

    if (skillTree.length === 0) return <></>;

    for (const category of skillTree) {
      for (const skill of category.skills) {
        if (skill) {
          if (typeof skill.selected !== 'undefined' && skill.selected) {
            skills.push({
              skill: skill.skill,
              level: typeof skill.level === 'undefined' ? 0 : skill.level,
            });
          }
        }
      }
    }

    if (skills.length > 0) {
      return skills.map((skill, i) => {
        return (
          <div className="flex justify-between text-xs" key={i}>
            <p>{skill.skill}</p>
            <p>{`${skill.level}%`}</p>
          </div>
        );
      });
    }
    return '';
  }

  function getTotalSelected() {
    const skills = [];

    if (skillTree.length === 0) return <></>;

    for (const category of skillTree) {
      for (const skill of category.skills) {
        if (skill) {
          if (typeof skill.selected !== 'undefined' && skill.selected) {
            skills.push({
              skill: skill.skill,
              level: typeof skill.level === 'undefined' ? 0 : skill.level,
            });
          }
        }
      }
    }
    return skills.length;
  }

  function setUserSkills() {
    const skills = [];

    for (const category of skillTree) {
      for (const skill of category.skills) {
        if (skill.selected)
          skills.push({
            ...skill,
            redeemableDitos: Math.floor(skill.level / 10) * category.credits,
          });
      }
    }

    setUserInfo(userInfo => {
      return { ...userInfo, skills };
    });
  }

  const createCommunity = async () => {
    setLoading({
      status: true,
      message: 'Creating community...',
    });
    try {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      // call the smart contract to create community
      const contract = new ethers.Contract(
        '0xe141f6C659bEA31d39cD043539E426D53bF3D7d8',
        communitiesABI,
        signer,
      );

      const estimatedGas = await contract.estimateGas.createCommunity();
      const createTx = await contract.createCommunity({
        // 500k gas
        gasLimit: ethers.BigNumber.from(estimatedGas).toNumber(), // 3896496,
        gasPrice: 7910854493,
      });
      // Wait for transaction to finish
      const communityAddress = await createTx.wait();
      console.log('communityAddress', communityAddress);
      const { events } = communityAddress;
      const communityCreatedEvent = events.find(
        e => e.event === 'CommunityCreated',
      );
      if (!communityCreatedEvent) {
        throw new Error('Something went wrong');
      }

      console.log(communityCreatedEvent);

      setLoading({
        status: true,
        message: 'Joining community...',
      });
      // call the smart contract to join community
      let amountOfRedeemableDitos = 0;
      for (const { redeemableDitos } of userInfo.skills) {
        amountOfRedeemableDitos += redeemableDitos;
      }

      const baseDitos = 2000;
      const totalDitos = amountOfRedeemableDitos + baseDitos;

      const communitContract = new ethers.Contract(
        communityCreatedEvent.args[0],
        contractABI,
        signer,
      );
      const joinTx = await communitContract.join(totalDitos);
      // Wait for transaction to finish
      await joinTx.wait();

      // call api to create community and user
      const { meta } = getUserJourney();
      const payload = {
        category: meta.category,
        addresses: [
          {
            blockchain: 'ETH',
            address: communityCreatedEvent.args[0],
          },
        ],
        name: meta.communityName,
        owner: {
          username: userInfo.username,
          skills: userInfo.skills,
        },
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading({
        status: false,
        message: null,
      });
      // update user in UserInfoContext
      setUserInfo({
        ...userInfo,
        ditoBalance: totalDitos,
        communityContract: {
          name: meta.communityName,
          address: communityCreatedEvent.args[0],
        },
      });
      removeUserJourney();
      router.push('/SignupCompleted');
    } catch (error) {
      console.log(error);
      setLoading({
        status: false,
        message: null,
      });
    }
  };

  async function updateUser(community) {
    try {
      let currentToken = token;
      console.log('1 ct', currentToken);
      const responseFetchToken = await magic.user.getIdToken();
      const didToken = await responseFetchToken;
      if (token !== didToken) {
        currentToken = didToken;
        setToken(didToken);
      }

      console.log('2 ct', currentToken);

      console.log('updated skills userinfo', userInfo);

      const payload = {
        username: userInfo.username,
        communityID: community._id,
        skills: userInfo.skills,
      };

      console.log('payload', payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: new Headers({
            Authorization: `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          }),
        },
      );

      const updatedUser = await response.json();

      router.push('/SignupCompleted');
    } catch (err) {
      console.log(err);
    }
  }

  const joinCommunity = async () => {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();
      console.log(userInfo);
      const contractAddress = userInfo.communityContract
        ? userInfo.communityContract.address
        : '0x790697f595Aa4F9294566be0d262f71b44b5039c';
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      );

      let amountOfRedeemableDitos = 0;
      for (const { redeemableDitos } of userInfo.skills) {
        amountOfRedeemableDitos += redeemableDitos;
      }

      // Send transaction to smart contract to update message and wait to finish
      const baseDitos = 2000;
      const totalDitos = amountOfRedeemableDitos + baseDitos;
      const tx = await contract.join(totalDitos);

      // Wait for transaction to finish
      const receipt = await tx.wait();

      await updateUser(userInfo.communitContract);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const submit = () => {
    const { journey } = getUserJourney();
    if (!userInfo.username) {
      alert('Please choose a nickname');
      return;
    }
    if (journey === 'community') {
      createCommunity();
    } else if (journey === 'invite') {
      joinCommunity();
    } else {
      router.push('/SignupPhaseTwo');
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (userInfo.skills.length > 0) {
      submit();
    }
  }, [userInfo.skills.length]);

  let journey = null;
  const userJourney = getUserJourney();
  if (userJourney) {
    journey = userJourney.journey;
  }

  return (
    <Layout
      navBar={{ hideNav: true }}
      flex
      splash={{
        color: 'blue',
        variant: 'default',
        alignment: 'left',
      }}
      logo
      bgImage={{ src: '/background-image.svg', alignment: 'left', size: 40 }}
    >
      <div className="flex flex-wrap justify-between h-full w-full relative">
        <div
          className="flex w-1/2 justify-center items-center space-y-8 p-8 flex-grow-0 h-full"
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <NicknameSelection
            setUserInfo={setUserInfo}
            value={userInfo.username}
            title="Welcome to Distributed Town!"
            subtitle="This is the first step to join a global community of local people or the other way around :)"
            placeholderText="Please choose a nickname"
            userInfo={userInfo}
          />
        </div>
        <div className="flex flex-col justify-center align-center text-center space-y-1 p-8 flex-grow w-1/2 overflow-auto h-full py-24">
          <h1 className="font-bold text-xl">Tell us about you!</h1>
          <p>
            Pick your Skills (<span className="underline">between 1 and 3</span>
            )
          </p>
          <p>Select what you’re the best at, and receive Credits for it.</p>
          {skillTree.map((category, i) => {
            return (
              <SkillsCard
                key={i}
                title={category.subCat}
                skills={category.skills}
                totalSelected={getTotalSelected()}
                selectSkill={skillSelectedIndex =>
                  selectSkill(i, skillSelectedIndex)
                }
                setSkillLevel={(skillIndex, skillLevel) =>
                  setSkillLevel(i, skillIndex, skillLevel)
                }
              />
            );
          })}
          <div className="bg-denim flex flex-row  items-center justify-between p-4 text-white">
            <p className=" flex md:h-16 lg:h-24 xl:h-28 w-1/2 items-center justify-center">
              Your selection
            </p>
            <div className="w-1/2">{getSelectedSkills()}</div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full absolute bottom-0 p-4 bg-white">
          <Button
            className="font-black"
            onClick={
              userInfo.skills && userInfo.skills.length > 0
                ? () => submit()
                : () => setUserSkills()
            }
          >
            {journey === 'community'
              ? 'Next: Create and Join Community'
              : journey === 'invite'
              ? 'Next: Join Community'
              : 'Next: choose your first community!'}
          </Button>
        </div>
      </div>
      {loading.status && (
        <div className="fixed inset-0 h-screen w-screen bg-opacity-50 bg-black flex justify-center items-center">
          <div className="w-48 h-48 bg-white rounded flex justify-center items-center">
            {loading.message}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SignupPhaseOne;
