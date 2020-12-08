import { useContext } from 'react';
import { useQuery } from 'react-query';
import { getUserInfo } from '../api';
import { MagicContext } from '../components/Store';

export const useGetUserInfo = () => {
  const [magic] = useContext(MagicContext);

  return useQuery('user', async () => {
    const didToken = await magic.user.getIdToken();
    return getUserInfo(didToken);
  });
};
