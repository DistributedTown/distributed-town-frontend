import { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import RegistrationModal from '../../../components/registration/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';

function Created() {
  const router = useRouter();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [loading] = useState(false);
  const [login] = useMagicLinkLogin();
  const { name: communityName, category: communityCategory } = router.query;

  const handleCreateAccountClick = async email => {
    await login(email);
    await router.push(
      `/community/create/pick-skills?communityName=${encodeURIComponent(
        communityName,
      )}&communityCategory=${encodeURIComponent(communityCategory)}`,
    );
  };

  return (
    <Layout
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
          <p className="text-orange text-3xl mt-8">Your community now has:</p>
          <div className="bg-rain-forest rounded-full flex flex-col p-8 items-center justify-center h-64 w-64 mt-4">
            <img src="/dito-tokens.svg" />
            <p className="text-orange mt-4">96000 DiTo</p>
          </div>
        </div>
        <div className="w-full flex justify-center bottom-0 right-0 border-2 border-gray-400 px-48">
          <div className="border-alizarin border-2 mr-8 p-2 w-64 w-full">
            <button
              type="button"
              onClick={() => setShowRegistrationModal(true)}
              className="border-2 border-rain-forest p-2 w-full text-3xl font-bold"
            >
              Pick your Skills
            </button>
          </div>
        </div>
      </div>
      <div
        className={`modalBackground modalVisible-${showRegistrationModal} bg-white`}
      >
        <RegistrationModal
          chosenSkill={communityCategory}
          handleCreateAccountClick={handleCreateAccountClick}
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
