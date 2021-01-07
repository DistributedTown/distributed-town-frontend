import { useState } from 'react';
import { useRouter } from 'next/router';

import RegistrationModal from '../../../components/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';
import Button from '../../../components/Button';
import { useCreateCommunityState } from '.';

function Created() {
  const router = useRouter();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [login, { isLoading }] = useMagicLinkLogin();
  const [community] = useCreateCommunityState();

  const handleCreateAccountClick = async email => {
    await login(email);
    await router.push(`/community/create/pick-skills`);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
        <div className="flex-1 text-center flex items-center flex-col">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <h2 className="text-4xl">You have founded {community.name}!</h2>
          <div className="text-yellow-300 bg-denim shadow rounded-full flex flex-col gap-2 p-8 items-center justify-center font-bold h-64 w-64 mt-6">
            <p>Your community now has:</p>
            <img alt="dito tokens" src="/dito-tokens.svg" />
            <p>96000 DiTo</p>
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
