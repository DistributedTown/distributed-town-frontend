import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

import {
  MagicContext,
  LoggedInContext,
  UserInfoContext,
  TokenContext
} from "../../components/Store";
import RegistrationModal from "../../components/registration/RegistrationModal";
import Layout from "../../components/Layout";
import NicknameSelection from "../../components/NicknameSelection";
import Button from "../../components/Button";
import communitiesRegistryAbi from "../../utils/communitiesRegistryAbi.json";
import RegistrationForm from "../../components/registration/RegistrationForm";

const communityMeta = {
  "DLT & Blockchain": {
    color: "denim",
    subtitle: "Ideal for small, functional Web3 teams aiming to",
    description: [
      "keep accounting & run proposals",
      "fair, milestone-based rewards & payments to members",
      "efficiently distribute tasks",
      "get initial fundings for their project",
      "coordinate for hackathons & sprints"
    ]
  },
  "Art & Lifestyle": {
    color: "rain-forest",
    subtitle: "For artists & creative minds who want to:",
    description: [
      "keep accounting & run proposals",
      "manage multi-disciplinary projects & distribute tasks",
      "distribute shares & royalties fairly",
      "maintain continuous funding flow",
      "update scores & rank while gaming"
    ]
  },
  "Local community": {
    color: "alizarin",
    subtitle: "For neighbors, condos & small local clubs who need to",
    description: [
      "hold a common treasury",
      "vote for local proposals based on reputation & commitment",
      "share & track common resources",
      "organize & fund local projects",
      "divide tasks for mutual support"
    ]
  }
};

function CommunityCreate() {
  const [token, setToken] = useContext(TokenContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [communities, setCommunities] = useState([]);
  const [communityName, setCommunityName] = useState("");
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  const router = useRouter();
  const [modalState, setModalState] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async function() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/community`,
        {
          method: "GET"
        }
      );
      const communitiesRes = await res.json();
      communitiesRes.forEach(community => {
        community.selected = false;
      });
      setCommunities(communitiesRes);
    })();
  }, []);

  async function sendToApi(receipt) {
    const payload = {
      address: receipt,
      name: communityName,
      category: communities.find(community => community.selected).category
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    setUserInfo({
      ...userInfo,
      communityContract: {
        ...userInfo.communityContract,
        name: communityName
      }
    });

    router.push("/community/created");
  }

  async function createCommunity() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      const contractABI = communitiesRegistryAbi;
      const contractAddress = "0xe141f6C659bEA31d39cD043539E426D53bF3D7d8";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.createCommunity();
      // Wait for transaction to finish
      const receipt = await tx.wait();
      setUserInfo({
        ...userInfo,
        communityContract: {
          address: receipt
        }
      });

      const addTx = await contract.addCommunity(receipt);
      // Wait for transaction to finish
      await tx.wait();

      await sendToApi(receipt);
    } catch (err) {
      console.error(err);
    }
  }

  function setSelected(id) {
    const newCommunities = [...communities];
    newCommunities.forEach(({ _id }, index) => {
      if (_id === id) {
        newCommunities[index].selected = true;
      } else {
        newCommunities[index].selected = false;
      }
    });
    setCommunities(newCommunities);
  }

  async function fetchUserData(DIDT) {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + DIDT
        })
      });
      const userData = await res.json();
      return userData;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateAccountClick(e) {
    e.preventDefault();
    try {
      const DIDT = await magic.auth.loginWithMagicLink({ email });

      setToken(DIDT);

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          method: "POST",
          headers: new Headers({
            Authorization: "Bearer " + DIDT
          })
        }
      );

      setLoggedIn(true);

      const userData = await fetchUserData(DIDT);

      const haSkills =
        userData[0].skills &&
        Array.isArray(userData[0].skills) &&
        userData[0].skills.length > 0;

      setUserInfo({
        ...userInfo,
        email: email,
        skills: []
      });
      createCommunity();
    } catch (err) {
      await magic.user.logout();
      console.error(err);
    }
  }

  return (
    <Layout
      navBar={{ hideNav: true }}
      flex
      splash={{
        color: "green",
        variant: "default",
        alignment: "left"
      }}
      logo
      bgImage={{ src: "/background-image.svg", alignment: "left", size: 40 }}
    >
      <div className="flex flex-wrap justify-between h-full w-full">
        <div
          className="flex w-1/2 justify-center items-center space-y-8 p-8 flex-grow-0 h-full"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <NicknameSelection
            setUserInfo={val => setCommunityName(val.username)}
            value={userInfo && userInfo.username}
            title="Welcome to Distributed Town!"
            subtitle={
              <span>
                This is your first Community. Pick up a simple, intuitive{" "}
                <strong>name</strong> (i.e.: your-project-name, or
                yourcommunity-city) and a good <strong>avatar</strong> to make
                it cozier!
              </span>
            }
            placeholderText="Please choose a community name"
            userInfo={userInfo}
            inputLabel="Community Name"
          />
        </div>
        <div className="flex flex-col text-center py-24 px-8 flex-grow w-1/2 overflow-auto">
          <h1 className="font-bold text-3xl">Choose the perfect Community</h1>
          <p className="text-xl px-16 mt-2 mb-8">
            Read the short description and pick the best type of community for
            you and your needs!
          </p>
          <div className="flex flex-wrap justify-center">
            {communities.map(community => {
              if (!communityMeta[community.category]) {
                return null;
              }

              const { _id, selected } = community;
              const { color, subtitle, description } = communityMeta[
                community.category
              ];

              return (
                <div
                  className={`rounded-xl border-4 border-black w-2/5 m-4`}
                  onClick={() => {
                    setSelected(_id);
                  }}
                >
                  <div
                    className={`bg-${color} text-white text-3xl font-bold border-b-4 rounded-md p-2 border-black leading-7`}
                  >
                    {community.category}
                  </div>
                  <div
                    className={`m-2 border-${color} border rounded-md p-1 leading-4 text-left ${
                      selected ? "bg-" + color + " text-white" : ""
                    }`}
                  >
                    <p className="text-sm text-center mb-2">{subtitle}</p>
                    <ol className="list-decimal list-inside my-2 text-xs">
                      {description.map(desc => {
                        return <li>{desc}</li>;
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center w-full absolute bottom-0 p-4 bg-white border-black border-t">
          <Button
            className="font-black font-bold text-2xl px-32"
            color="rain-forest"
            onClick={() => setModalState(true)}
          >
            Next: Launch & Get Community Credits!
          </Button>
        </div>
      </div>
      <div
        className={`modalBackground modalVisible-${modalState} bg-white flex justify-center items-center w-screen`}
      >
        <RegistrationForm
          onSubmit={handleCreateAccountClick}
          setEmail={setEmail}
          title="Welcome to Dito"
          email={email}
          cta="Create Account"
          placeholderText="Please enter your email"
          className="flex justify-center items-center"
        />
      </div>
    </Layout>
  );
}

export default CommunityCreate;
