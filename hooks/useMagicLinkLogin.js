import { useMutation } from 'react-query';
import { login } from '../api/users';



export const useMetamaskLogin = () => {

  const loginHandler = async () => {
    await login()
  };

  return useMutation(loginHandler, { throwOnError: true });
};
