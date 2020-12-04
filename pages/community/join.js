import { useContext, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Quote from '../../components/Quote';
import RegistrationModal from '../../components/registration/RegistrationModal';
import { MagicContext } from '../../components/Store';
import Layout from '../../components/Layout';
import { getUserInfo } from '../../api';
import { useMagicLinkLogin } from '../../hooks/useMagicLinkLogin';

const Join = props => {
  const [magic] = useContext(MagicContext);
  const [login] = useMagicLinkLogin();

  const router = useRouter();

  async function handleCreateAccountClick(e, email) {
    e.preventDefault();
    try {
      const { didToken } = await login(email);

      const userData = await getUserInfo(didToken);
      const hasSkills =
        userData[0].skills &&
        Array.isArray(userData[0].skills) &&
        userData[0].skills.length > 0;

      if (hasSkills) {
        router.push('/skillwallet');
      } else {
        router.push('/signup/pick-skills');
      }
    } catch (err) {
      await magic.user.logout();
      throw err;
    }
  }

  const [showRegistration, setShowRegistration] = useState(false);

  const onSkillClick = skill => {
    // TODO: Rediret to pick skills if logged in
    // if (loggedIn) {
    //   router.push(
    //     `/signup/pick-skills?communitySkill=${encodeURIComponent(skill)}`,
    //   );
    // }

    setShowRegistration(true);
  };

  return (
    <Layout
      className="h-screen w-full"
      logo={{ withText: true }}
      splash={{
        color: 'blue',
        variant: '1',
        alignment: 'right',
        isTranslucent: false,
        fullHeight: false,
        zIndex: -1,
      }}
    >
      <div className="firstPage">
        <Link href="#">
          <a className="fixed top-0 right-0 hover:underline p-8 text-2xl font-bold">
            what's this about?
          </a>
        </Link>
        <div className="w-full h-full flex flex-col items-center space-y-8 px-4 mt-12">
          <Quote quote="Have you ever thought, 'I would like to contribute, but …'" />
          <p className="w-1/3 text-gray-500">
            Distributed Town (DiTo) lets you create or join a community with one
            click. No name, location or bank account necessary.
          </p>
          <div className="p-8 text-center w-3/4 grid grid-flow-row grid-cols-5 gap-4">
            {props.skills.map((skill, i) => (
              <button
                key={skill}
                type="button"
                onClick={() => onSkillClick(skill)}
                className="rounded rounded-full flex items-center justify-center p-2"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`modalBackground modalVisible-${showRegistration} bg-white`}
      >
        <RegistrationModal
          handleCreateAccountClick={handleCreateAccountClick}
          onChooseDifferentCommunity={() => setShowRegistration(false)}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  let skills = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill`, {
    method: 'GET',
  });
  skills = await skills.json();

  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Join;
