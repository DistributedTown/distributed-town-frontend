import { useMutation } from 'react-query';
import { createCommunity } from '../api/communities';
import {
  createCommunity as createCommunityContract,
} from '../contracts/community';

export const useCreateCommunity = () => {


  const createCommunityMutation = async ({ name, category, user }) => {
    const communityAddress = await createCommunityContract();

    // await joinCommunity(
    //   communityAddress,
    //   calculateDitosFromSkils(user.skillWallet),
    // );

    const community = {
      address: communityAddress,
      name,
      category,
    };
    await createCommunity(community);
  };

  return useMutation(createCommunityMutation, { throwOnError: true });
};
