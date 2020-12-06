import { useMutation } from 'react-query';
import { useContext } from 'react';
import { login } from '../api';
import { MagicContext } from '../components/Store';

export const useMagicLinkLogin = () => {
  const [magic] = useContext(MagicContext);

  const loginHandler = async email => {
    // TODO: Validate email in form
    const didToken = await magic.auth.loginWithMagicLink({ email });
    await login(didToken);

    return { didToken };
  };

  return useMutation(loginHandler);
};
