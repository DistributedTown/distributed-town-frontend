import { useMutation } from 'react-query';
import { useContext } from 'react';
import { fundUser, login } from '../api';
import { MagicContext } from '../components/Store';

export const useMagicLinkLogin = () => {
  const [magic] = useContext(MagicContext);

  const loginHandler = async email => {
    // TODO: Validate email in form
    const didToken = await magic.auth.loginWithMagicLink({ email });
    sessionStorage.setItem('user', JSON.stringify({ email }));
    await login(didToken);
    const { publicAddress } = await magic.user.getMetadata();
    await fundUser(publicAddress);

    return { didToken };
  };

  return useMutation(loginHandler);
};
