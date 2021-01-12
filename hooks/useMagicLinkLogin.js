import { useMutation } from 'react-query';
import { fundUser, login } from '../api';
import { useMagic } from '../components/MagicStore';

export const useMagicLinkLogin = () => {
  const magic = useMagic();

  const loginHandler = async email => {
    const didToken = await magic.auth.loginWithMagicLink({ email });

    await login(didToken);
    const { publicAddress } = await magic.user.getMetadata();
    await fundUser(publicAddress);

    return { didToken };
  };

  return useMutation(loginHandler, { throwOnError: true });
};
