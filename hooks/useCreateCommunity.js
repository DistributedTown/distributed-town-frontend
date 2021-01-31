import { useMutation } from 'react-query';
import { createCommunityAndUser } from '../api/communities';
import {
  createCommunity as createCommunityContract,
  joinCommunity,
} from '../contracts/community';
import calculateDitosFromSkils from '../utils/calculateDitosFromSkills';
import { fundUser } from '../api/users';

export const useCreateCommunity = () => {


  const createCommunityMutation = async ({ name, category, user }) => {
    await fundUser(window.ethereum.selectedAddress)

    const communityAddress = await createCommunityContract();

    await joinCommunity(
      communityAddress,
      calculateDitosFromSkils(user.skills),
    );

    const community = {
      address: communityAddress,
      name,
      category,
    };
    await createCommunityAndUser(community, user);
  };

  return useMutation(createCommunityMutation, { throwOnError: true });
};
