import { useMutation } from 'react-query';
import { fundUser, login } from '../api';
import { useMagic } from '../components/Store';

export const useMagicLinkLogin = () => {
  const magic = useMagic();

  const loginHandler = async email => {
    // TODO: Validate email in form
    const didToken = await magic.auth.loginWithMagicLink({ email });

    sessionStorage.setItem('user', JSON.stringify({ email }));
    await login(didToken);
    const { publicAddress } = await magic.user.getMetadata();
    await fundUser(publicAddress);

    return { didToken };
  };

  return useMutation(loginHandler, { throwOnError: true });
};
