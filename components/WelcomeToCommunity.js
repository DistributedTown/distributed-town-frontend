import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from './Button';
import InviteModal from './InviteModal';

export default function WelcomeToCommunity({
  communityName,
  showInviteButton = false
}) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [ditoBalance, setDitoBalance] = useState(0);
  const router = useRouter();

  // const { linkUrl: shareLink } = data || {};

  const onInviteClick = async () => {
    setShowInviteModal(true);
  };

  useEffect(() => {
    setDitoBalance(localStorage.getItem('credits'));
  }, [])


  return (
    <div className="flex flex-col items-center justify-between w-full h-full pt-32 space-y-8">
      <div className="flex flex-col items-center flex-1 text-center">
        <p className="text-5xl font-bold">Congrats!</p>
        <p className="text-4xl">You are now a member of {communityName}!</p>
        <div className="flex flex-col items-center justify-center w-64 h-64 p-8 mt-6 space-y-2 font-bold text-yellow-300 rounded-full shadow bg-denim">
          <p>You received:</p>
          <img alt="dito tokens" src="/dito-tokens.svg" />
          <p>
            {ditoBalance ? `${ditoBalance} DiTo` : 'Loading dito balance...'}
          </p>
        </div>
      </div>
      <div className="bottom-0 right-0 flex justify-center w-full px-48 py-4 space-x-4">
        {/* TODO: Only on create */}
        {showInviteButton && (
          <Button onClick={onInviteClick} loading={loadingShareLink}>
            Invite new Members
          </Button>
        )}
        <Button filled onClick={() => router.push('/skillwallet')}>
          Check your SkillWallet
        </Button>
      </div>
      <InviteModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        shareLink={''}
      />
    </div>
  );
}
