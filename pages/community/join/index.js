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
        <Logo className="p-8 mx-auto sm:ml-0" />
        <div className="flex flex-col items-center w-full h-full px-4 space-y-8">
          <Quote quote="Have you ever thought, 'I would like to contribute, but …'" />
          <p className="text-center text-gray-500">
            Distributed Town (DiTo) lets you <strong>create</strong> or{' '}
            <strong>join</strong> a community with one click.
            <br />
            No <strong>name</strong>, <strong>location</strong> or{' '}
            <strong>bank account</strong> necessary.
          </p>
          <div className="flex flex-wrap justify-center py-8 text-center">
            {skills.map(skill => (
              <Button
                key={skill}
                onClick={() => setChosenSkill(skill)}
                className="m-2 rounded-full"
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
