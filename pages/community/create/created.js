import { useState } from 'react';
import { useRouter } from 'next/router';

import RegistrationModal from '../../../components/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';
import Button from '../../../components/Button';
import { useCreateCommunityState } from '.';
import Logo from '../../../components/Logo';

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
    <div className="w-full h-screen">
      <div className="flex flex-col h-full">
        <Logo className="p-8 mx-auto md:ml-0" />
        <div className="flex flex-col items-center justify-center flex-1 pb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">Congratulations!</h1>
          <h2 className="sm:text-4xl">You have founded {community.name}!</h2>
          <div className="flex flex-col items-center justify-center w-64 h-64 p-8 mt-6 space-y-2 font-bold text-yellow-300 rounded-full shadow bg-denim">
            <p>Your community now has:</p>
            <img alt="dito tokens" src="/dito-tokens.svg" />
            <p>96000 DiTo</p>
          </div>
        </div>
        <div className="flex justify-center w-full p-4 bg-white">
          <Button
            filled
            type="button"
            onClick={() => setShowRegistrationModal(true)}
          >
            Pick your Skills
          </Button>
        </div>
      </div>
      <RegistrationModal
        show={showRegistrationModal}
        loading={isLoading}
        handleCreateAccountClick={handleCreateAccountClick}
      />
    </div>
  );
}

export default Created;
