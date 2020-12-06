import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useMutation } from 'react-query';
import { MagicContext } from '../components/Store';
import contractABI from '../utils/communityContractAbi.json';
import { getUserInfo, updateUserCommunityID } from '../api';

export const useJoinCommunity = () => {
  const router = useRouter();
  const [magic] = useContext(MagicContext);

  async function joinCommunity(community) {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();

    const contractAddress = community.address
      ? community.address
      : '0x21255bC60234359A7aBa6EdB8d1b9cd0070B13aE';
    console.log('CONTRACT ADDRESS', contractAddress);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const didToken = await magic.user.getIdToken();
    const userInfo = await getUserInfo(didToken);
    let amountOfRedeemableDitos = 0;
    for (const { redeemableDitos } of userInfo.skills) {
      amountOfRedeemableDitos += redeemableDitos || 0;
    }

    // Send transaction to smart contract to update message and wait to finish
    const baseDitos = 2000;
    const totalDitos = amountOfRedeemableDitos + baseDitos;
    const tx = await contract.join(totalDitos);

    // Wait for transaction to finish
    await tx.wait();

    await updateUserCommunityID(didToken, community._id);

    router.push('/signup/completed');
  }

  return useMutation(joinCommunity);
};
