import { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Quote from '../../../components/Quote';
import RegistrationModal from '../../../components/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';
import Logo from '../../../components/Logo';

const Join = ({ skills = [] }) => {
  const [login, { isLoading }] = useMagicLinkLogin();

  const [chosenSkill, setChosenSkill] = useState('');
  const showRegistrationModal = !!chosenSkill;

  const router = useRouter();

  async function handleCreateAccountClick(email) {
    await login(email);
    await router.push(
      `/community/join/pick-skills?categorySkill=${encodeURIComponent(
        chosenSkill,
      )}`,
    );
  }

  return (
    <div className="w-full h-full">
      <div>
        <div className="flex flex-row justify-between items-center">
          <Logo className="p-8" />
          <Link href="#">
            <a className="text-black text-2xl font-bold">what's this about?</a>
          </Link>
        </div>
        <div className="w-full h-full flex flex-col items-center space-y-8 px-4">
          <Quote quote="Have you ever thought, 'I would like to contribute, but …'" />
          <p className="text-gray-500 text-center">
            Distributed Town (DiTo) lets you <strong>create</strong> or{' '}
            <strong>join</strong> a community with one click.
            <br />
            No <strong>name</strong>, <strong>location</strong> or{' '}
            <strong>bank account</strong> necessary.
          </p>
          {/* <div className="text-center grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8"> */}
          <div className="text-center flex flex-wrap justify-center gap-4 py-8">
            {skills.map(skill => (
              <button
                type="button"
                key={skill}
                onClick={() => setChosenSkill(skill)}
                className="bg-white shadow focus:ring focus:outline-none rounded-full flex items-center justify-center px-6 py-3"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
      <RegistrationModal
        show={showRegistrationModal}
        loading={isLoading}
        chosenSkill={chosenSkill}
        handleCreateAccountClick={handleCreateAccountClick}
        onChooseDifferentCommunity={() => setChosenSkill('')}
      />
    </div>
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
