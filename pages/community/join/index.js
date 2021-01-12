import { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Quote from '../../../components/Quote';
import RegistrationModal from '../../../components/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';

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
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Logo className="p-8" />
          <Link href="#">
            <a className="p-8 text-2xl font-bold text-black">
              what's this about?
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-center w-full h-full px-4 space-y-8">
          <Quote quote="Have you ever thought, 'I would like to contribute, but …'" />
          <p className="text-center text-gray-500">
            Distributed Town (DiTo) lets you <strong>create</strong> or{' '}
            <strong>join</strong> a community with one click.
            <br />
            No <strong>name</strong>, <strong>location</strong> or{' '}
            <strong>bank account</strong> necessary.
          </p>
          {/* <div className="grid grid-flow-row grid-cols-2 gap-4 py-8 text-center sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
          <div className="flex flex-wrap justify-center gap-4 py-8 text-center">
            {skills.map(skill => (
              <Button
                key={skill}
                onClick={() => setChosenSkill(skill)}
                className="rounded-full"
              >
                {skill}
              </Button>
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
