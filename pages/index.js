import SkillPill from "../components/SkillPill";
import Quote from "../components/Quote";
import RegistrationModal from "../components/registration/RegistrationModal";

import { useContext, useEffect, useState } from "react";
import Store, {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  TokenContext,
  UserInfoContext,
} from "../components/Store";
import { useRouter } from "next/router";
import TheNav from "../components/TheNav";
import { get, set } from "mongoose";

import bgImages from "../utils/bgImages";


import communityContractAbi from "../utils/communityContractAbi.json";

import { ethers } from "ethers";

const Index = (props) => {
  const [token, setToken] = useContext(TokenContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [modalState, setModalState] = useState(false);

  const [selectedPill, setSelectedPill] = useState(-1);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const showRegisterModal = () => {
    setSelectedPill(-1);
    return toggleModal();
  };

  async function fetchCommunityById(id, DIDT) {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/community/${id}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + DIDT,
          }),
        }
      );
      const community = await response.json();
      return community;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUserData(DIDT) {
    try {
      let res = await fetch(`${process.env.API_URL}/api/user`, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + DIDT,
        }),
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

      console.log("didToken", DIDT);

      setToken(DIDT);

      let res = await fetch(`${process.env.API_URL}/api/user/login`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + DIDT,
        }),
      });

      setLoggedIn(true);

      const userData = await fetchUserData(DIDT);
      console.log("TWO", userData);
      const haSkills =
        userData[0].skills &&
        Array.isArray(userData[0].skills) &&
        userData[0].skills.length > 0;

      if (haSkills) {
        console.log("going to the skillwallet");
        const userCommunityData = await fetchCommunityById(
          userData[0].communityID,
          DIDT
        );
        setUserInfo({
          ...userInfo,
          ...userData[0],
          communityContract: userCommunityData,
        });

        router.push("/skillWallet");
      } else {
        const { publicAddress } = await magic.user.getMetadata();

        await fetch("/api/getFunded", {
          method: "POST",
          body: JSON.stringify({ publicAddress }),
        });

        setUserInfo({ ...userInfo, email: email, skills: [] });

        router.push("/SignupPhaseOne");
      }
    } catch (err) {
      console.error(err);
    }
  }
  const getCommunityBgImg = (selectedCommunity) => {
    return typeof (selectedCommunity !== "undefined") && selectedCommunity >= 0
      ? bgImages[props.skills[selectedCommunity].toLowerCase()]
      : bgImages["default"];
  };

  useEffect(() => {
    if (selectedPill !== -1)
      console.log(props.skills[selectedPill])
    setUserInfo({
      ...userInfo,
      category: props.skills[selectedPill],
      background: getCommunityBgImg(selectedPill),
    });
  }, [selectedPill]);

  if (loggedIn) {
    if (typeof window !== 'undefined') router.push('/skillwallet')
    return null
  } else {
    return (
      <div className="h-screen w-full">
        <div className="firstPage">
          <TheNav
            logoUrl="/dito-logo.svg"
            slogan="Distributed Town"
            helpCta="What is it about?"
            helpUrl="#"
            links={[
              { text: "Docs", url: "#" },
              { text: "Blog", url: "#" },
            ]}
          />
          <div className="w-full h-full flex flex-col items-center space-y-8 px-4">
            <Quote quote="Have you ever thought, 'I would like to contribute, but …'" />
            <p className="w-1/3 text-gray-500">
              Distributed Town (DiTo) lets you create or join a community with one
              click. No name, location or bank account necessary.
          </p>
            <div className="p-8 text-center w-3/4 grid grid-flow-row grid-cols-5 gap-4">
              {props.skills.map((skill, i) => {
                return (
                  <SkillPill
                    onClick={() => {
                      setSelectedPill(i);
                      toggleModal();
                    }}
                    key={i}
                    text={skill}
                    selected={selectedPill === i}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={`modalBackground modalVisible-${modalState} bg-white`}>
          <RegistrationModal selectedPill={selectedPill} skills={props.skills} handleCreateAccountClick={handleCreateAccountClick} email={email} setEmail={setEmail} showRegisterModal={showRegisterModal} getCommunityBgImg={getCommunityBgImg} />
        </div>
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  let skills = await fetch(`${process.env.API_URL}/api/skill`, {
    method: "GET",
  });
  skills = await skills.json();

  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Index;
