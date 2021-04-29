import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useJoinCommunity } from '../../../hooks/useJoinCommunity';

import CommunityCard from '../../../components/CommunityCard';
import { useGetCommunities } from '../../../hooks/useGetCommunities';
import Button from '../../../components/Button';
import QRModal from '../../../components/QRModal';
import { hasPendingAuthentication } from '../../../api/users';

function ChooseCommunity() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(null);
  const [joinCommunity, { isLoading: isJoining }] = useJoinCommunity();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Refactor
  const { refetch: getCommunities } = useGetCommunities({
    category: router.query.category,
  });
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState();

  const toggleModal = () => setShowModal(!showModal);
  const modalText = [
    'Scan with your ',
    <a href="" className="underline text-blue-600 hover:text-blue-400 visited:text-purple-400" >SkillWallet App</a>,
    ' to verify membership.'];

  useEffect(() => {
    const { category } = router.query;
    if (!category) return;

    (async () => {
      const comms = await getCommunities({ category });
      setCommunities(comms || []);
    })();
  }, [router.query.category]);

  const longpoll = async () => {
    if (!isAuthenticated) {
      async function authenticationLongPoll(address, interval, pollAttemptsCount) {
        const hasPendingAuths = await hasPendingAuthentication(address);
        console.log(`poll ${pollAttemptsCount}`);
        setIsAuthenticated(!hasPendingAuths);
        if (hasPendingAuths && pollAttemptsCount > 0) {
          setTimeout(() => {
            authenticationLongPoll(address, interval, --pollAttemptsCount);
          }, interval);
        } else {
          return;
        }
      }
      await authenticationLongPoll(address, 3000, 20);
    } else {
      router.push(
        `/community/join/completed?communityName=${encodeURIComponent(
          chosenCommunity.name,
        )}`,
      );
    }
  }

  const handleCloseModal = async () => {
    const hasPendingAuths = await hasPendingAuthentication(address);
    if (hasPendingAuths)
      window.confirm('You have not authenticated and your skill wallet is not active');
  }

  const handleJoinClick = async () => {
    if (!address) {
      if (!window.ethereum.selectedAddress)
        await window.ethereum.enable()
      console.log(window.ethereum.selectedAddress);
      setAddress(window.ethereum.selectedAddress)
    }
    await joinCommunity(chosenCommunity);
    toggleModal();
    await longpoll();

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
          onClick={handleJoinClick}
          disabled={!chosenCommunity}
          loading={isJoining}
        >
          Join and get your credits!
        </Button>
      </div>
      { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText} qrCodeObj={
        {
          address: address,
          hash: "wnGO5OQLkAEJ"
        }} closeOnClick={handleCloseModal} /> : null}

    </div>
  );
}

export default ChooseCommunity;
