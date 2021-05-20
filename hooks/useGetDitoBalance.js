import { useQuery } from 'react-query';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetDitoBalance = () => {
  const { data: userInfo } = useGetUserInfo(localStorage.getItem('tokenId'));

  const enabled = !!userInfo;

  return useQuery(
    'ditoBalance',
    async () => {
      const ditoBalance = '2222';
      return ditoBalance;
    },
    { enabled },
  );
};
