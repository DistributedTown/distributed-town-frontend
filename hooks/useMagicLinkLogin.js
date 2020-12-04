import { useMutation } from 'react-query';
import { useContext } from 'react';
import { authenticateWithDb } from '../api';
import { MagicContext, TokenContext } from '../components/Store';

export const useMagicLinkLogin = () => {
  const [magic] = useContext(MagicContext);
  const [, setToken] = useContext(TokenContext);

  const loginHandler = async email => {
    if (email.trim() === '') {
      throw new Error('Please enter a valid email address');
    }
    const didToken = await magic.auth.loginWithMagicLink({ email });
    await authenticateWithDb(didToken);

    setToken(didToken);
    return { didToken };
  };

  return useMutation(loginHandler);
};
