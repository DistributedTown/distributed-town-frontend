import { useState } from 'react';
import { useRouter } from 'next/router';

import RegistrationModal from '../../../components/registration/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';
import Button from '../../../components/Button';

function Created() {
  const router = useRouter();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [login, { isLoading }] = useMagicLinkLogin();
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
    <div className="w-full">
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
        <div className="w-full flex justify-center p-4">
          <Button
            filled
            type="button"
            onClick={() => setShowRegistrationModal(true)}
          >
            Pick your Skills
          </Button>
        </div>
      </div>
      <div
        className={`modalBackground modalVisible-${showRegistrationModal} bg-white`}
      >
        <RegistrationModal
          loading={isLoading}
          handleCreateAccountClick={handleCreateAccountClick}
        />
      </div>
    </div>
  );
}

export default Created;
