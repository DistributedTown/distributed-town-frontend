import { useQuery } from 'react-query';
import { getUserInfo } from '../api';
import { useMagic } from '../components/MagicStore';

export const useGetUserInfo = () => {
  const magic = useMagic();

  return useQuery('user', async () => {
    const didToken = await magic.user.getIdToken();
    return getUserInfo(didToken);
  });
};
