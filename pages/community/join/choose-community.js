import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useJoinCommunity } from '../../../hooks/useJoinCommunity';

import CommunityCard from '../../../components/CommunityCard';
import { useGetCommunities } from '../../../hooks/useGetCommunities';
import Button from '../../../components/Button';
import QRModal from '../../../components/QRModal';
import LogoWithBlob from '../../../components/LogoWithBlob';
import Logo from '../../../components/Logo';
import { hasPendingAuthentication } from '../../../api/users';

function ChooseCommunity() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(null);
  const [joinCommunity, { isLoading: isJoining }] = useJoinCommunity();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenId, setTokenId] = useState();

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
    else
    router.push(
      `/community/join/completed?communityName=${encodeURIComponent(
        chosenCommunity.name,
      )}`,
    );
  }

  const handleJoinClick = async () => {
    if (!address) {
      if (!window.ethereum.selectedAddress)
        await window.ethereum.enable()
      console.log(window.ethereum.selectedAddress);
      setAddress(window.ethereum.selectedAddress)
    }
    const tokenId = await joinCommunity(chosenCommunity);
    console.log(tokenId);
    setTokenId(tokenId);
    toggleModal();
    await longpoll();

  };

  return (
    // <div className="flex flex-col w-full h-screen">
    //   <div
    //     className="flex-1 flex flex-col space-y-8 mx-auto bg-cover bg-center p-8 w-full overflow-y-scroll"
    //     style={{ backgroundImage: 'url(/background-image.svg)' }}
    //   >
    //     <h1 className="text-2xl font-bold">
    //       Here's a few communities for you!
    //     </h1>
    //   </div>
    //   <div className="flex justify-center w-full p-4 bg-white">
    //     <Button
    //       filled
    //       onClick={handleJoinClick}
    //       disabled={!chosenCommunity}
    //       loading={isJoining}
    //     >
    //       Join and get your credits!
    //     </Button>
    //   </div>
    //   { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText} qrCodeObj={
    //     {
    //       tokenId: tokenId,
    //       hash: "wnGO5OQLkAEJ"
    //     }} closeOnClick={handleCloseModal} /> : null}

    // </div>


    <div className="relative flex flex-col justify-between w-full h-screen">
      <LogoWithBlob />
      <div className="flex flex-col flex-1 md:flex-row">
        <div
          className="flex flex-col items-center justify-center w-5/12 p-8 space-y-8 bg-center bg-cover"
          style={{
            backdropFilter: 'blur(5px)',
            backgroundImage: 'url(/background-image.svg)',
          }}
        >
          <div className="grid md:absolute md:top-0 md:left-0">
            <Logo className={[{ 'p-8': false }, 'md:p-8 p-0']} />
          </div>
          <div className="flex flex-col items-center ">
            <div className="mb-4 text-3xl font-bold text-center text-gray-900">
              DITO Credits you'll earn with your skills
            </div>
            <h3 className="text-xl font-bold mb-16">Description of the process</h3>

            <div className="mt-16 bg-white rounded-xl border-2 border-denim flex-col w-5/6">
              <div className="flex justify-around mt-8 mb-2">
                <div>Skill & bar will go here</div>
                <img src="/credits-blue.svg" className="w-20" />
              </div>
              <div className="flex justify-around mt-2 mb-2">
                <div>Skill & bar will go here</div>
                <img src="/credits-blue.svg" className="w-20" />
              </div>
              <div className="flex justify-around mt-2 mb-8">
                <div>Skill & bar will go here</div>
                <img src="/credits-blue.svg" className="w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-grow w-7/12 h-full p-8 space-y-1 space-y-2 overflow-auto text-center align-center">
          <p>
            <b>Here's a few diTown Communities for you</b> (based on your <b>Skills</b>)
          </p>
          <p>Select the one <b className="underline">that inspires you the most</b> - and <b className="underline">start adding Value</b> to it</p>
          <div className="flex flex-col justify-center w-full p-4 ">
            <div className="flex flex-col">
            {communities.map((community, i) => (
              <CommunityCard
                key={i}
                community={community}
                selected={community === chosenCommunity}
                onSelectCommunity={() => setChosenCommunity(community)}
              />
            ))}
          </div>
            <Button
              filled
              onClick={handleJoinClick}
              disabled={!chosenCommunity}
              loading={isJoining}
              className="mt-8"
            >
              Scan QR-Code to Claim your Membership!
            </Button>
          </div>
          { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText} qrCodeObj={
            {
              tokenId: tokenId,
              hash: "wnGO5OQLkAEJ"
            }} closeOnClick={handleCloseModal} /> : null}
        </div>
      </div>
    </div>
  
  );
}

export default ChooseCommunity;
