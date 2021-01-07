import { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Quote from '../../../components/Quote';
import RegistrationModal from '../../../components/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';

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
      <div className="firstPage">
        <Link href="#">
          <a className="text-white fixed top-0 right-0 hover:p-8 text-2xl font-bold">
            what's this about?
          </a>
        </Link>
        <div className="w-full h-full flex flex-col items-center space-y-8 px-4 mt-12">
          <Quote quote="Have you ever thought, 'I would like to contribute, but …'" />
          <p className="w-2/3 lg:w-1/3 text-gray-500">
            Distributed Town (DiTo) lets you create or join a community with one
            click. No name, location or bank account necessary.
          </p>
          <div className="text-center grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8">
            {skills.map(skill => (
              <button
                type="button"
                key={skill}
                onClick={() => setChosenSkill(skill)}
                className="bg-white shadow focus:ring focus:outline-none rounded-full flex items-center justify-center p-2"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`modalBackground modalVisible-${showRegistrationModal} bg-white`}
      >
        <RegistrationModal
          loading={isLoading}
          chosenSkill={chosenSkill}
          handleCreateAccountClick={handleCreateAccountClick}
          onChooseDifferentCommunity={() => setChosenSkill('')}
        />
      </div>
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
