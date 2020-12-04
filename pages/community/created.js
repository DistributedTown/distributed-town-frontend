import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import RegistrationModal from '../../components/registration/RegistrationModal';
import {
  MagicContext,
  LoggedInContext,
  UserInfoContext,
  TokenContext,
} from '../../components/Store';
import {
  setUserJourney,
  getUserJourney,
  removeUserJourney,
} from '../../utils/userJourneyManager';
import bgImages from '../../utils/bgImages.js';

function Created() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [, setToken] = useContext(TokenContext);
  const [, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [communityName, setCommunityName] = useState('Community');
  const [modalState, setModalState] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userJourney = getUserJourney();
    let meta = {};
    if (userJourney) {
      meta = userJourney.meta;
    }
    if (meta.communityName) {
      setCommunityName(meta.communityName);
    }
  }, []);

  const fetchUserData = async DIDT => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${DIDT}`,
        }),
      });
      const userData = await res.json();
      return userData;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCommunityById = async (id, DIDT) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${DIDT}`,
          }),
        },
      );
      const community = await response.json();
      return community;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateAccountClick = async e => {
    e.preventDefault();
    try {
      const DIDT = await magic.auth.loginWithMagicLink({ email });
      setToken(DIDT);

      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${DIDT}`,
        }),
      });

      const metaData = await magic.user.getMetadata();
      console.log(metaData.publicAddress);
      await fetch('/api/getFunded', {
        method: 'POST',
        body: JSON.stringify({ publicAddress: metaData.publicAddress }),
      });

      setLoggedIn(true);

      const userData = await fetchUserData(DIDT);

      const haSkills =
        userData[0].skills &&
        Array.isArray(userData[0].skills) &&
        userData[0].skills.length > 0;

      if (haSkills) {
        console.log('going to the skillwallet');
        const userCommunityData = await fetchCommunityById(
          userData[0].communityID,
          DIDT,
        );
        setUserInfo({
          ...userInfo,
          ...userData[0],
          communityContract: userCommunityData,
        });

        router.push('/skillwallet');
        removeUserJourney();
      } else {
        setUserInfo({
          ...userInfo,
          email,
          skills: userData[0].skills || [],
        });

        // send the user to pick skills
        setUserJourney({
          step: 'skills',
        });
        router.push('/signup/pick-skills');
      }
    } catch (err) {
      await magic.user.logout();
      console.error(err);
    }
    setLoading(false);
  };

  const userJourney = getUserJourney();
  let meta = {};
  if (userJourney) {
    meta = userJourney.meta;
  }

  return (
    <Layout
      navBar
      logo
      splash={{
        color: 'rain-forest',
        variant: 'quad',
        alignment: 'left',
      }}
    >
      <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
        <div className="flex-1 text-center flex items-center flex-col">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <h2 className="text-4xl">You have founded {communityName}!</h2>
          <p className="text-orange text-3xl mt-8">Your Community now has:</p>
          <div className="bg-rain-forest rounded-full flex flex-col p-8 items-center justify-center h-64 w-64 mt-4">
            <img src="/dito-tokens.svg" />
            <p className="text-orange mt-4">96000 DiTo</p>
          </div>
        </div>
        <div className="w-full flex justify-center bottom-0 right-0 border-2 border-gray-400 px-48">
          <div className="border-alizarin border-2 mr-8 p-2 w-64 w-full">
            <button
              type="button"
              onClick={() => setModalState(true)}
              className="border-2 border-rain-forest p-2 w-full text-3xl font-bold"
            >
              Pick your Skills
            </button>
          </div>
        </div>
      </div>
      <div className={`modalBackground modalVisible-${modalState} bg-white`}>
        <RegistrationModal
          selectedPill={0}
          skills={[meta.communityName]}
          handleCreateAccountClick={handleCreateAccountClick}
          email={email}
          setEmail={setEmail}
          showRegisterModal={modalState}
          getCommunityBgImg={() => bgImages.default}
        />
      </div>
      {loading && (
        <div className="fixed inset-0 h-screen w-screen bg-opacity-50 bg-black flex justify-center items-center">
          <div className="w-48 h-48 bg-white rounded flex justify-center items-center">
            Signing you in...
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Created;
