import { useQuery } from 'react-query';
import { getUserInfo } from '../api/users';

export const useGetUserInfo = () => {

  return useQuery('user', async () => {
    return getUserInfo();
  });
};
