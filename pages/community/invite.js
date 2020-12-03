import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RegistrationModal from '../../components/registration/RegistrationModal';
import {
  MagicContext,
  LoggedInContext,
  TokenContext,
  UserInfoContext,
} from '../../components/Store';
import bgImages from '../../utils/bgImages.js';

import {
  setUserJourney,
  removeUserJourney,
} from '../../utils/userJourneyManager';

const Join = props => {
  const [, setToken] = useContext(TokenContext);
  const [, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const router = useRouter();

  console.log(router.query);
  let communityId = null;
  let communityName = null;
  useEffect(() => {
    setUserJourney({
      journey: 'invite',
      step: 'login',
    });
  }, []);
  if (router.query.hasOwnProperty('communityId')) {
    communityId = router.query.communityId;
    communityName = router.query.communityName;
  } else {
    router.push('/');
    removeUserJourney();
    return;
  }

  const getCommunityBgImg = selectedCommunity => {
    return typeof (selectedCommunity !== 'undefined') && selectedCommunity >= 0
      ? bgImages[props.skills[selectedCommunity].toLowerCase()]
      : bgImages.default;
  };

  async function fetchCommunityById(id, DIDT) {
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
  }

  async function fetchUserData(DIDT) {
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
  }

  async function handleCreateAccountClick(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const DIDT = await magic.auth.loginWithMagicLink({ email });

      console.log('didToken', DIDT);

      setToken(DIDT);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          method: 'POST',
          headers: new Headers({
            Authorization: `Bearer ${DIDT}`,
          }),
        },
      );

      setLoggedIn(true);

      const userData = await fetchUserData(DIDT);
      console.log('TWO', userData);
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
      } else {
        const communityData = await fetchCommunityById(communityId, DIDT);
        console.log(communityData);
        setUserInfo({
          ...userInfo,
          email,
          communityContract: {
            ...communityData,
            address: communityData.addresses[0].address,
          },
          category: communityData.category,
          skills: [],
        });
        setTimeout(() => {
          router.push('/signup/step-one');
        }, 400);
      }
    } catch (err) {
      await magic.user.logout();
      console.error(err);
    }
  }

  return (
    <>
      <RegistrationModal
        selectedPill={0}
        skills={[communityName]}
        handleCreateAccountClick={handleCreateAccountClick}
        email={email}
        setEmail={setEmail}
        getCommunityBgImg={getCommunityBgImg}
      />
      {loading && (
        <div className="fixed inset-0 h-screen w-screen bg-opacity-50 bg-black flex justify-center items-center">
          <div className="w-48 h-48 bg-white rounded flex justify-center items-center">
            Signing you in...
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  let skills = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill`, {
    method: 'GET',
  });
  skills = await skills.json();

  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Join;
