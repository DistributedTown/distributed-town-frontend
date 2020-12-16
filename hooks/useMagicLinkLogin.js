import { useMutation } from 'react-query';
import { fundUser, login } from '../api';
import { useMagic } from '../components/Store';

export const useMagicLinkLogin = () => {
  const magic = useMagic();

  const loginHandler = async email => {
    const didToken = await magic.auth.loginWithMagicLink({ email });

    await login(didToken);
    const { publicAddress } = await magic.user.getMetadata();
    const res = await fundUser(publicAddress);
    console.log('RESPONSE', res);

    return { didToken };
  };

  return useMutation(loginHandler, { throwOnError: true });
};