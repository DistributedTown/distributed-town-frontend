import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useJoinCommunity } from '../../../hooks/useJoinCommunity';

import CommunityCard from '../../../components/CommunityCard';
import { useGetCommunities } from '../../../hooks/useGetCommunities';
import Button from '../../../components/Button';
import QRModal from '../../../components/QRModal';
import LogoWithBlob from '../../../components/LogoWithBlob';
import Logo from '../../../components/Logo';
import { hasPendingAuthentication, generateNonce } from '../../../api/users';
import { claim } from '../../../contracts/skillwallet';
import { changeNetwork } from '../../../utils/metamask.utils';

function ChooseCommunity() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(null);
  const [joinCommunity, { isLoading: isJoining }] = useJoinCommunity();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenId, setTokenId] = useState();
  const [nonce, setNonce] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const { category } = router.query;
    if (!category) return;

    (async () => {
      const comms = await getCommunities({ category });
      setCommunities(comms || []);
      setIsLoading(false);
    })();
    setIsLoading(false);
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
    setIsLoading(true);
    await changeNetwork();
  
    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable()
      console.log(window.ethereum.selectedAddress);
      setAddress(window.ethereum.selectedAddress)
    }
    console.log('changing network')
    console.log('network changed');
    console.log(chosenCommunity)

    const tokenId = await joinCommunity(chosenCommunity);
    if (tokenId) {
      await claim(chosenCommunity.address)
      setTokenId(tokenId);
      const nonce = await generateNonce(1, tokenId);
      setNonce(nonce);
      setIsLoading(false);
      toggleModal();
      await longpoll();
    } else {
      // TODO: better error handlings
      alert('Something went wrong! Please try again!');
    }
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-screen">
      {isLoading ?
        <div id="item">
          <h2>Loading</h2>
          <i id="loader"></i>
        </div> : <div></div>}
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

        <div className="flex flex-col w-7/12">
          <p className="text-center mt-8">
            <b>Here's a few diTown Communities for you</b> (based on your <b>Skills</b>)
          </p>
          <p className="text-center">Select the one <b className="underline">that inspires you the most</b> - and <b className="underline">start adding Value</b> to it 🙌🏻</p>

          <div className="flex flex-col  w-full h-full p-8  overflow-scroll text-center ">

            <div className="flex flex-col justify-center w-full p-4 items-center">
              <div className="flex flex-col max-h-44">
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
            {
              showModal ? <QRModal toggleModal={toggleModal} modalText={modalText} qrCodeObj={
                {
                  tokenId,
                  nonce
                }} closeOnClick={handleCloseModal} /> : null
            }
            {showModal ? console.log(tokenId, nonce) : null}
          </div>
          <Button
            filled
            onClick={handleJoinClick}
            disabled={!chosenCommunity}
            // loading={isJoining}
            className="mt-8 mb-16"
          >
            Scan QR-Code to Claim your Membership!
          </Button>
        </div>
      </div>
    </div>

  );
}

export default ChooseCommunity;
