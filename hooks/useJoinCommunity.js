import { useContext } from 'react';
import { useMutation } from 'react-query';
import { MagicContext } from '../components/Store';
import { getUserInfo, updateUserCommunityID } from '../api';
import { joinCommunity as joinCommunityContract } from '../contracts/community';

export const useJoinCommunity = () => {
  const [magic] = useContext(MagicContext);

  async function joinCommunity(community) {
    const didToken = await magic.user.getIdToken();
    const userInfo = await getUserInfo(didToken);

    // TODO: This should not be done on the frontend
    let amountOfRedeemableDitos = 0;
    for (const { redeemableDitos } of userInfo.skills) {
      amountOfRedeemableDitos += redeemableDitos || 0;
    }

    // Send transaction to smart contract to update message and wait to finish
    const baseDitos = 2000;
    const totalDitos = amountOfRedeemableDitos + baseDitos;

    await joinCommunityContract(
      magic.rpcProvider,
      community.address,
      totalDitos,
    );
    await updateUserCommunityID(didToken, community._id);
  }

  return useMutation(joinCommunity, { throwOnError: true });
};
