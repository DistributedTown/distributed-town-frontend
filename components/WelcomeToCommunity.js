import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGetDitoBalance } from '../hooks/useGetDitoBalance';
import { useGetInvitation } from '../hooks/useGetInvitation';
import Button from './Button';
import InviteModal from './InviteModal';

export default function WelcomeToCommunity({ showInviteButton = false }) {
  const { data: ditoBalance } = useGetDitoBalance();
  const { data, refetch: getShareLink } = useGetInvitation();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const router = useRouter();

  const { linkUrl: shareLink } = data || {};

  const onInviteClick = async () => {
    await getShareLink();
    setShowInviteModal(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
      <div className="flex-1 text-center flex items-center flex-col">
        <p className="text-5xl font-bold">Congrats!</p>
        <p className="text-4xl">You are now a member of DiTo!</p>
        <div className="text-yellow-400 bg-red-600 rounded-full flex flex-col gap-2 p-8 items-center justify-center font-bold h-64 w-64 mt-6">
          <p>Community credits:</p>
          <img alt="dito tokens" src="/dito-tokens.svg" />
          <p>
            {ditoBalance ? `${ditoBalance} DiTo` : 'Loading dito balance...'}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center gap-4 bottom-0 right-0 py-4 px-48">
        {/* TODO: Only on create */}
        {showInviteButton && (
          <Button
            onClick={onInviteClick}
            className="border-rain-forest text-2xl"
          >
            Invite new Members
          </Button>
        )}
        <Button
          type="button"
          onClick={() => router.push('/skillwallet')}
          className="text-2xl"
        >
          Check your SkillWallet
        </Button>
      </div>
      <InviteModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        shareLink={shareLink}
      />
    </div>
  );
}
