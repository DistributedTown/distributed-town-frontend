import { useQuery } from 'react-query';
import { useMagic } from '../components/MagicStore';
import { getCommunityById } from '../api/communities';
import { useGetUserInfo } from './useGetUserInfo';
import {
  getCommunityDitoTokensContract,
  getDitoContractUserBalance,
} from '../contracts/community';

export const useGetDitoBalance = () => {
  const magic = useMagic();
  const { data: userInfo } = useGetUserInfo();

  const enabled = !!userInfo;

  return useQuery(
    'ditoBalance',
    async () => {
      // TODO: useUserInfo to avoid making the same call many times
      const didToken = await magic.user.getIdToken();
      const community = await getCommunityById(didToken, userInfo.communityID);
      const communityContractAddress = community.addresses.find(
        a => a.blockchain === 'ETH',
      ).address;

      const ditoContractAddress = await getCommunityDitoTokensContract(
        magic.rpcProvider,
        communityContractAddress,
      );

      const ditoBalance = await getDitoContractUserBalance(
        magic.rpcProvider,
        ditoContractAddress,
      );
      return ditoBalance;
    },
    { enabled },
  );
};
