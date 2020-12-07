import { createContext, useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';

/* initializing context API values */
export const MagicContext = createContext();
export const LoggedInContext = createContext();
export const LoadingContext = createContext();
export const UserInfoContext = createContext();
export const TokenContext = createContext();

/* this function wraps our entire app within our context APIs so they all have access to their values */
const Store = ({ children }) => {
  const [magic, setMagic] = useState();
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
    (async () => {
      const m = new Magic('pk_test_1C5A2BC69B7C18E5', {
        network: 'ropsten',
        chainId: 8888, // Your own node's chainId
      });

      // const loggedIn = await m.user.isLoggedIn();
      // if (!loggedIn) {
      //   const { email } = JSON.parse(sessionStorage.getItem('user')) || {};
      //   if (email) {
      //     await m.auth.loginWithMagicLink({ email });
      //   }
      // }

      setMagic(m);
    })();
  }, []);

  if (!magic)
    return (
      <div className="w-screen h-screen grid place-content-center">
        <div className="rounded w-5 h-5 bg-denim animate-spin " />
      </div>
    );

  return (
    // `children` (passed as props in this file) represents the component nested inside <Store /> in `/pages/index.js` and `/pages/login.js`
    <MagicContext.Provider value={[magic]}>
      <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
        <TokenContext.Provider value={[token, setToken]}>
          <div className="flex">{children}</div>
        </TokenContext.Provider>
      </UserInfoContext.Provider>
    </MagicContext.Provider>
  );
};

export default Store;

// http://localhost:3000/community/invite?communityId=01eqdy3jndzjx3rgz2fd4e371p&communityName=Blabla
