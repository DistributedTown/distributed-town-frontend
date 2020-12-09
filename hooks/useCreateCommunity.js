import { useMutation } from 'react-query';
import { useMagic } from '../components/Store';
import { createCommunityAndUser } from '../api';
import {
  createCommunity as createCommunityContract,
  joinCommunity,
} from '../contracts/community';

export const useCreateCommunity = () => {
  const magic = useMagic();

  return useMutation(
    async ({ name, category, user }) => {
      // TODO: Create contract should join the user automatically instead of needing to call join after that.
      // call the smart contract to create community
      const communityAddress = await createCommunityContract(magic.rpcProvider);

      await joinCommunity(
        magic.rpcProvider,
        communityAddress,
        calculateDitos(user.skills),
      );

      const community = {
        address: communityAddress,
        name,
        category,
      };
      const didToken = await magic.user.getIdToken();
      await createCommunityAndUser(didToken, community, user);
    },
    { throwOnError: true },
  );
};

// FIXME: Security concern
// TODO: This should be calculated and done in the backend
function calculateDitos(skills = []) {
  let amountOfRedeemableDitos = 0;
  for (const { redeemableDitos } of skills) {
    amountOfRedeemableDitos += redeemableDitos || 0;
  }
  const baseDitos = 2000;
  const totalDitos = amountOfRedeemableDitos + baseDitos;
  return totalDitos;
}
