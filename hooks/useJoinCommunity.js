import { useMutation } from 'react-query';
import { useMagic } from '../components/MagicStore';
import { getUserInfo, updateUserCommunityID } from '../api';
import { joinCommunity as joinCommunityContract } from '../contracts/community';
import calculateDitosFromSkills from '../utils/calculateDitosFromSkills';

export const useJoinCommunity = () => {
  const magic = useMagic();

  async function joinCommunity(community) {
    const didToken = await magic.user.getIdToken();
    const userInfo = await getUserInfo(didToken);

    const totalDitos = calculateDitosFromSkills(userInfo.skills);

    await joinCommunityContract(
      magic.rpcProvider,
      community.address,
      totalDitos,
    );
    await updateUserCommunityID(didToken, community._id);
  }

  return useMutation(joinCommunity, { throwOnError: true });
};
