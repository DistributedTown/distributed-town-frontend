import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useJoinCommunity } from '../../../hooks/useJoinCommunity';

import CommunityCard from '../../../components/CommunityCard';
import { useGetCommunities } from '../../../hooks/useGetCommunities';
import Button from '../../../components/Button';
import MyModal from '../../../components/MyModal';

function ChooseCommunity() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(null);
  const [joinCommunity, { isLoading: isJoining }] = useJoinCommunity();
  // TODO: Refactor
  const { refetch: getCommunities } = useGetCommunities({
    category: router.query.category,
  });
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const modalText = 'Scan with your SkillWallet App to verify membership.'

  useEffect(() => {
    const { category } = router.query;
    if (!category) return;

    (async () => {
      const comms = await getCommunities({ category });
      setCommunities(comms || []);
    })();
  }, [router.query.category]);

  const handleJoinClick = async () => {
    // if (!window.ethereum.selectedAddress)
    await window.ethereum.enable();
    await joinCommunity(chosenCommunity);
    await router.push(
      `/community/join/qr?communityName=${encodeURIComponent(
        chosenCommunity.name,
      )}`,
    );
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div
        className="flex-1 flex flex-col space-y-8 mx-auto bg-cover bg-center p-8 w-full overflow-y-scroll"
        style={{ backgroundImage: 'url(/background-image.svg)' }}
      >
        <h1 className="text-2xl font-bold">
          Here's a few communities for you!
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, i) => (
            <CommunityCard
              key={i}
              community={community}
              selected={community === chosenCommunity}
              onSelectCommunity={() => setChosenCommunity(community)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full p-4 bg-white">
        <Button
          filled
          onClick={toggleModal}
          disabled={!chosenCommunity}
          loading={isJoining}
        >
          Join and get your credits!
        </Button>
      </div>
      { showModal ? <MyModal toggleModal={toggleModal} modalText={modalText}/> : null}
    </div>
  );
}

export default ChooseCommunity;
