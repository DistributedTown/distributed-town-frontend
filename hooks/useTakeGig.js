import { useMutation } from 'react-query';
import { acceptGig } from '../api';
import { useMagic } from '../components/MagicStore';

export const useTakeGig = () => {
  const magic = useMagic();

  return useMutation(
    async id => {
      const didToken = await magic.user.getIdToken();
      await acceptGig(didToken, id);
    },
    { throwOnError: true },
  );
};
