import { useContext } from 'react';
import { useMutation } from 'react-query';
import { MagicContext } from '../components/Store';
import { createUser } from '../api';

export const useCreateUser = () => {
  const [magic] = useContext(MagicContext);

  return useMutation(async user => {
    const didToken = await magic.user.getIdToken();
    await createUser(didToken, user);
  });
};
