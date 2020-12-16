import { useMutation } from 'react-query';
import { useMagic } from '../components/Store';
import { createCommunityAndUser } from '../api';
import {
  createCommunity as createCommunityContract,
  joinCommunity,
} from '../contracts/community';
import calculateDitosFromSkils from '../utils/calculateDitosFromSkills';

export const useCreateCommunity = () => {
  const magic = useMagic();

  const createCommunityMutation = async ({ name, category, user }) => {
    const communityAddress = await createCommunityContract(magic.rpcProvider);

    await joinCommunity(
      magic.rpcProvider,
      communityAddress,
      calculateDitosFromSkils(user.skills),
    );

    const community = {
      address: communityAddress,
      name,
      category,
    };
    const didToken = await magic.user.getIdToken();
    await createCommunityAndUser(didToken, community, user);
  };

  return useMutation(createCommunityMutation, { throwOnError: true });
};
