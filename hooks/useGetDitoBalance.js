import { useQuery } from 'react-query';
import { getCommunityById } from '../api/communities';
import { useGetUserInfo } from './useGetUserInfo';
import {
  getCommunityDitoTokensContract,
  getDitoContractUserBalance,
} from '../contracts/community';

export const useGetDitoBalance = () => {
  const { data: userInfo } = useGetUserInfo(localStorage.getItem('tokenId'));

  const enabled = !!userInfo;

  return useQuery(
    'ditoBalance',
    async () => {
      // TODO: useUserInfo to avoid making the same call many times
      const community = await getCommunityById(userInfo.communityID);
      const communityContractAddress = community.addresses.find(
        a => a.blockchain === 'ETH',
      ).address;

      const ditoContractAddress = await getCommunityDitoTokensContract(
        communityContractAddress,
      );

      const ditoBalance = await getDitoContractUserBalance(
        ditoContractAddress,
      );
      return ditoBalance;
    },
    { enabled },
  );
};
