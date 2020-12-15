import { useQuery } from 'react-query';
import { getInvitation } from '../api';
import { useMagic } from '../components/Store';

export const useGetInvitation = () => {
  const magic = useMagic();

  return useQuery('inviteLink', async () => {
    const didToken = await magic.user.getIdToken();
    return getInvitation(didToken);
  });
};
