import { useContext } from 'react';
import { useQuery } from 'react-query';
import { getInvitation } from '../api';
import { MagicContext } from '../components/Store';

export const useGetInvitation = () => {
  const [magic] = useContext(MagicContext);

  return useQuery(
    'inviteLink',
    async () => {
      const didToken = await magic.user.getIdToken();
      return getInvitation(didToken);
    },
    { enabled: false },
  );
};
