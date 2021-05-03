import { useQuery } from 'react-query';
import { getUserInfo } from '../api/users';

export const useGetUserInfo = (tokenId) => {

  return useQuery('user', async (tokenId) => {
    return getUserInfo();
  });
};
