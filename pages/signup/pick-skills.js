import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import produce from 'immer';
import { UserInfoContext } from '../../components/Store';
import Layout from '../../components/Layout';

import SkillsCard from '../../components/SkillsCard';

import Button from '../../components/Button';
import NicknameSelection from '../../components/NicknameSelection';
import { getUserJourney } from '../../utils/userJourneyManager';
import { useCreateCommunity } from '../../hooks/useCreateCommunity';
import { useJoinCommunity } from '../../hooks/useJoinCommunity';

function SignupPhaseOne() {
  const router = useRouter();
  const [userInfo = { skills: [] }, setUserInfo] = useContext(UserInfoContext);
  const [skillTree, setSkillTree] = useState([]);
  const [loading] = useState({
    status: false,
    message: null,
  });

  const [createCommunity] = useCreateCommunity();
  const [joinCommunity] = useJoinCommunity();

  useEffect(() => {
    let { category } = userInfo;
    const { journey, meta } = getUserJourney() || {};
    if (journey === 'community') {
      category = encodeURIComponent(meta.category);
    }
    if (journey === 'invite') {
      category = encodeURIComponent(userInfo.category);
    }

    const getSkillTree = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/skill?category=${category}`,
          { method: 'GET' },
        );
        const skillTreeResponse = await response.json();
        console.log(skillTreeResponse);
        skillTreeResponse.categories.forEach(c => {
          c.skills = c.skills.map(skill => ({ skill }));
        });
        console.log(
          'SKILL TREE RESPONSE FORMATTED',
          skillTreeResponse.categories,
        );
        setSkillTree(skillTreeResponse.categories);
      } catch (err) {
        console.log(err);
      }
    };
    getSkillTree();
  }, []);

  function toggleSelectedSkill(categoryIndex, selectedSkillIndex) {
    const newSkillTree = produce(skillTree, draft => {
      const skill = draft
        .find((_, cIndex) => cIndex === categoryIndex)
        .skills.find((_, sIndex) => sIndex === selectedSkillIndex);

      skill.selected = !skill.selected;
    });

    setSkillTree(newSkillTree);
  }

  function setSkillLevel(categoryIndex, skillIndex, level) {
    const newSkillTree = produce(skillTree, draft => {
      const skill = draft
        .find((_, cIndex) => cIndex === categoryIndex)
        .skills.find((_, sIndex) => sIndex === skillIndex);

      skill.level = level;
    });

    setSkillTree(newSkillTree);
  }

  function getSelectedSkills() {
    const skills = skillTree
      .flatMap(category => category.skills || [])
      .filter(skill => skill.selected)
      .map(skill => ({ ...skill, level: skill.level || 0 }));

    return skills;
  }

  function getTotalSelected() {
    return getSelectedSkills().length;
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

    setUserInfo(prev => {
      return { ...prev, skills };
    });
  }

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
      router.push('/signup/choose-community');
    }
  };

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
                  toggleSelectedSkill(i, skillSelectedIndex)
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
            <div className="w-1/2">
              {getSelectedSkills().map((skill, i) => {
                return (
                  <div className="flex justify-between text-xs" key={i}>
                    <p>{skill.skill}</p>
                    <p>{`${skill.level}%`}</p>
                  </div>
                );
              })}
            </div>
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
