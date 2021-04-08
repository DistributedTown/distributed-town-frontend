import { useMutation } from 'react-query';
import { joinCommunity as joinCommunityContract } from '../contracts/community';
import calculateDitosFromSkills from '../utils/calculateDitosFromSkills';

export const useJoinCommunity = () => {

  async function joinCommunity(community) {

    // move that in the backend
    // const totalDitos = calculateDitosFromSkills(userInfo.skills);
    const totalDitos = 2100;
    console.log(community);
    await joinCommunityContract(
      community.address,
      totalDitos,
    );
  }

  return useMutation(joinCommunity, { throwOnError: true });
};
