import { useMutation } from 'react-query';
import { useMagic } from '../components/MagicStore';
import { createUser } from '../api/users';

export const useCreateUser = () => {
  const magic = useMagic();

  return useMutation(
    async user => {
      const didToken = await magic.user.getIdToken();
      await createUser(didToken, user);
    },
    { throwOnError: true },
  );
};
