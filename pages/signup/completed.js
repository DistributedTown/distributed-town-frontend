import { useState } from 'react';

import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useGetInvitation } from '../../hooks/useGetInvitation';

import { getUserJourney } from '../../utils/userJourneyManager';
import { useGetDitoBalance } from '../../hooks/useGetDitoBalance';

function SignupCompleted() {
  const { data: ditoBalance } = useGetDitoBalance();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const router = useRouter();

  const { journey } = getUserJourney();

  const { data, refetch: getShareLink } = useGetInvitation();
  const { linkUrl: shareLink } = data || {};

  const inviteMembers = async () => {
    getShareLink();
    setShowInviteModal(true);
  };

  const copyLink = () => {
    const text = `Hey there! We've got some funds from DistributedTown,
    join my community - and let's work on something meaningful together! ${shareLink}`;
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Async: Copying to clipboard was successful!');
      },
      err => {
        console.error('Async: Could not copy text: ', err);
      },
    );
  };

  return (
    <Layout
      navBar
      logo
      splash={{
        color: 'alizarin',
        variant: 'quad',
        alignment: 'left',
      }}
    >
      <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
        <div className="flex-1 text-center flex items-center flex-col">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <h2 className="text-4xl">You are now a member of DiTo!</h2>
          <p className="text-orange text-3xl mt-8">
            Here are your community credits
          </p>
          <div className="bg-red-600 rounded-full flex flex-col p-8 items-center justify-center h-64 w-64 mt-4">
            <img alt="dito tokens" src="/dito-tokens.svg" />
            <p className="text-orange mt-4">
              {ditoBalance ? `${ditoBalance} DiTo` : 'Loading dito balance...'}
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center bottom-0 right-0 border-2 border-gray-400 py-4 px-48">
          {journey === 'community' && (
            <button
              type="button"
              onClick={inviteMembers}
              className="border-2 border-rain-forest p-2 w-full text-3xl font-bold mr-8"
            >
              Invite new Members
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push('/skillwallet')}
            className="border-2 border-blue-600 p-2 w-full text-2xl font-bold"
          >
            Check your SkillWallet
          </button>
        </div>
      </div>
      {showInviteModal && (
        <div
          className="fixed inset-0 h-screen w-screen bg-opacity-50 bg-white flex justify-center items-center"
          onClick={() => setShowInviteModal(false)}
        >
          <div className="bg-white flex flex-col justify-center items-center border-2 border-black">
            <a
              target="_blank"
              rel="noreferrer"
              href={encodeURI(`https://twitter.com/intent/tweet?text=Hey there! We've got some funds from DistributedTown,
join my community - and let's work on something meaningful together! ${shareLink}`)}
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
            >
              <img
                alt="twitter logo"
                src="/twitter.png"
                className="mr-4 h-12"
              />
              Twitter
            </a>
            <a
              href={encodeURI(
                `https://www.facebook.com/sharer/sharer.php?href=`,
              )}
              target="_blank"
              rel="noreferrer"
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
              onClick={() => {
                const text = encodeURIComponent(
                  `Hey there! We've got some funds from DistributedTown, join my community - and let's work on something meaningful together!`,
                );
                console.log(text);
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${text}`,
                  'facebook-share-dialog',
                  'width=626,height=436',
                );
              }}
            >
              <img src="/fb.png" className="mr-4 h-12" />
              Facebook
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={encodeURI(`https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=DiTo&summary=Hey there! We've got some funds from DistributedTown,
              join my community - and let's work on something meaningful together! ${shareLink}`)}
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
            >
              <img src="/linkedin.png" className="mr-4 h-12" />
              LinkedIn
            </a>
            <div
              onClick={copyLink}
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
            >
              <img src="/copy.png" className="mr-4 h-12" />
              Copy link
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SignupCompleted;
