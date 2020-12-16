import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useJoinCommunity } from '../../../hooks/useJoinCommunity';

import CommunityCard from '../../../components/CommunityCard';
import { useGetCommunities } from '../../../hooks/useGetCommunities';
import Button from '../../../components/Button';

function ChooseCommunity() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(null);
  const [joinCommunity, { isLoading: isJoining }] = useJoinCommunity();
  // TODO: Refactor
  const { refetch: getCommunities } = useGetCommunities({
    category: router.query.category,
  });

  useEffect(() => {
    const { category } = router.query;
    if (!category) return;

    (async () => {
      const comms = await getCommunities({ category });
      setCommunities(comms || []);
    })();
  }, [router.query.category]);

  const handleJoinClick = async () => {
    await joinCommunity(chosenCommunity);
    await router.push('/community/join/completed');
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div
        className="flex flex-col space-y-8 container mx-auto bg-cover bg-center p-8 md:h-screen overflow-y-auto"
        style={{ backgroundImage: 'url(/background-image.svg)' }}
      >
        <h1 className="text-xl font-bold">Here's a few communities for you!</h1>
        {communities.map((community, i) => (
          <CommunityCard
            key={i}
            community={community}
            selected={community === chosenCommunity}
            onSelectCommunity={() => setChosenCommunity(community)}
          />
        ))}
      </div>
      <div className="flex flex-col justify-between space-y-8 w-full flex-grow p-8 ">
        <h1>The credit you will earn with your skills</h1>
        <p>
          Your skills are your main asset. And the only thing that matters. The
          more rare they are, the more credits you’ll get!
        </p>
        {/* TODO: Loading */}
        <Button
          filled
          onClick={handleJoinClick}
          disabled={!chosenCommunity}
          loading={isJoining}
        >
          Join and get your credits!
        </Button>
      </div>
    </div>
  );
}

export default ChooseCommunity;
