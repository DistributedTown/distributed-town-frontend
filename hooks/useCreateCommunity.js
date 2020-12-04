import { useContext } from 'react';
import { ethers } from 'ethers';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import communitiesABI from '../utils/communitiesRegistryAbi.json';
import {
  MagicContext,
  TokenContext,
  UserInfoContext,
} from '../components/Store';
import { getUserJourney, removeUserJourney } from '../utils/userJourneyManager';
import contractABI from '../utils/communityContractAbi.json';

export const useCreateCommunity = () => {
  const [userInfo = { skills: [] }, setUserInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  const [token] = useContext(TokenContext);
  const router = useRouter();

  const createCommunity = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      // call the smart contract to create community
      const contract = new ethers.Contract(
        '0xe141f6C659bEA31d39cD043539E426D53bF3D7d8',
        communitiesABI,
        signer,
      );

      const estimatedGas = await contract.estimateGas.createCommunity();
      const createTx = await contract.createCommunity({
        // 500k gas
        gasLimit: ethers.BigNumber.from(estimatedGas).toNumber(), // 3896496,
        gasPrice: 7910854493,
      });
      // Wait for transaction to finish
      const communityTransactionResult = await createTx.wait();
      console.log('community transaction result', communityTransactionResult);
      const { events } = communityTransactionResult;
      const communityCreatedEvent = events.find(
        e => e.event === 'CommunityCreated',
      );
      if (!communityCreatedEvent) {
        throw new Error('Something went wrong');
      }
      const communityAddress = communityCreatedEvent.args[0];

      console.log(communityCreatedEvent);

      // TODO: Message JOINING COMMUNITY
      // setLoading({
      //   status: true,
      //   message: 'Joining community...',
      // });
      // call the smart contract to join community
      let amountOfRedeemableDitos = 0;
      for (const { redeemableDitos } of userInfo.skills) {
        amountOfRedeemableDitos += redeemableDitos;
      }

      const baseDitos = 2000;
      const totalDitos = amountOfRedeemableDitos + baseDitos;

      const communitContract = new ethers.Contract(
        communityAddress,
        contractABI,
        signer,
      );
      const joinTx = await communitContract.join(totalDitos);
      // Wait for transaction to finish
      await joinTx.wait();

      // call api to create community and user
      const { meta } = getUserJourney();
      const payload = {
        category: meta.category,
        addresses: [
          {
            blockchain: 'ETH',
            address: communityCreatedEvent.args[0],
          },
        ],
        name: meta.communityName,
        owner: {
          username: userInfo.username,
          skills: userInfo.skills,
        },
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // update user in UserInfoContext
      setUserInfo({
        ...userInfo,
        ditoBalance: totalDitos,
        communityContract: {
          name: meta.communityName,
          address: communityCreatedEvent.args[0],
        },
      });
      removeUserJourney();
      router.push('/signup/completed');
    } catch (error) {
      console.log(error);
    }
  };

  return useMutation(createCommunity);
};
