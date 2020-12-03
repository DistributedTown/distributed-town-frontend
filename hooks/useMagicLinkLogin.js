import { useMutation } from 'react-query';
import { useContext, useState } from 'react';
import { setUserJourney } from '../utils/userJourneyManager';
import { authenticateWithDb } from '../api';
import {
  LoggedInContext,
  MagicContext,
  TokenContext,
} from '../components/Store';

export const useMagicLinkLogin = () => {
  const [, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [, setToken] = useContext(TokenContext);
  const [, setLoading] = useState(false);

  const loginHandler = async email => {
    try {
      if (email.trim() === '') {
        throw new Error('Please enter a valid email address');
      }
      const didToken = await magic.auth.loginWithMagicLink({ email });
      setLoading(true);
      const user = await authenticateWithDb(didToken);
      setUserJourney({
        journey: 'login',
        step: 'login',
      });
      if (user) {
        setToken(didToken);
        setLoggedIn(true);
      } else {
        throw new Error('Something went wrong, please try again!');
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return useMutation(loginHandler);
};
