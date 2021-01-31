import { useMutation } from 'react-query';
import { getUserInfo, updateUserCommunityID } from '../api/users';
import { joinCommunity as joinCommunityContract } from '../contracts/community';
import calculateDitosFromSkills from '../utils/calculateDitosFromSkills';

export const useJoinCommunity = () => {

  async function joinCommunity(community) {
    const userInfo = await getUserInfo();

    const totalDitos = calculateDitosFromSkills(userInfo.skills);

    await joinCommunityContract(
      community.address,
      totalDitos,
    );
    await updateUserCommunityID(community._id);
  }

  return useMutation(joinCommunity, { throwOnError: true });
};
