import { useQuery } from 'react-query';
import { getCommunityInfo } from '../api/users';

export const useGetCommunity = (address) => {
  return useQuery('user', async (address) => {
    return getCommunityInfo(address);
  });
}
