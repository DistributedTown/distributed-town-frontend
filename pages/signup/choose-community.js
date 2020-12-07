import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useJoinCommunity } from '../../hooks/useJoinCommunity';

import CommunityCard from '../../components/CommunityCard';
import { useGetCommunities } from '../../hooks/useGetCommunities';

function ChooseCommunity() {
  const [communities, setCommunities] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(null);
  const [joinCommunity, { isLoading: joiningCommunity }] = useJoinCommunity();
  const { refetch: getCommunities } = useGetCommunities();

  useEffect(() => {
    (async () => {
      const comms = await getCommunities();
      setCommunities(comms || []);
    })();
  }, []);

  const router = useRouter();

  const handleJoinClick = async () => {
    await joinCommunity(chosenCommunity);
    await router.push('/signup/completed');
  };

  const joinDisabled = !chosenCommunity || joiningCommunity;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-8 container mx-auto bg-blue-100 p-8 h-screen overflow-y-auto">
          <h1>Here's a few communities for you!</h1>
          {communities.map((community, i) => (
            <CommunityCard
              key={i}
              community={community}
              selected={community === chosenCommunity}
              onSelectCommunity={() => setChosenCommunity(community)}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between space-y-8 w-full flex-grow p-8 h-screen">
          <h1>The credit you will earn with your skills</h1>
          <p>
            Your skills are your main asset. And the only thing that matters.
            The more rare they are, the more credits you’ll get!
          </p>
          {/* TODO: Loading */}
          <button
            className="w-full border-2 border-gray-400 p-2 text-center disabled:opacity-50"
            type="button"
            onClick={handleJoinClick}
            disabled={joinDisabled}
          >
            Join and get your credits!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseCommunity;
