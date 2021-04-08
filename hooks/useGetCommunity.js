import { useQuery } from 'react-query';
import { getCommunityInfo } from '../api/users';

export const useGetCommunity = () => {
  return useQuery('user', async () => {
    return getCommunityInfo();
  });
}
