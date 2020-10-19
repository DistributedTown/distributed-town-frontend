import { createContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import Layout from "./Layout";

/* initializing context API values */
export const MagicContext = createContext();
export const LoggedInContext = createContext();
export const LoadingContext = createContext();
export const UserInfoContext = createContext();
export const TokenContext = createContext();

/* this function wraps our entire app within our context APIs so they all have access to their values */
const Store = ({ children }) => {
  const [magic, setMagic] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: "", skills: [] });
  const [token, setToken] = useState("");

  useEffect(() => {
    setIsLoading(true);

    /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
    let m = new Magic('pk_test_1C5A2BC69B7C18E5', {
      network: "ropsten",
    });
    setMagic(m);
  }, []);

  useEffect(() => {
    (async () => {
      if (typeof magic !== "undefined") {
        /* If the user has a valid session with our server, it will return {authorized: true, user: user} */
        let loggedIn = false;
        if (magic && magic.user) {
          loggedIn = await magic.user.isLoggedIn();
        }

        /* If db returns {authorized: false}, there is no valid session, so log user out of their session with Magic if it exists */
        // if (!loggedIn) {
        //   await magic.user.logout();
        // }

        console.log("LOGGEDIN");
        console.log(loggedIn);

        setLoggedIn(loggedIn);
        // setIsLoading(false);
      }
    })();
  }, [magic]);

  useEffect(() => {
    setIsLoading(false);
  }, [loggedIn]);

  return (
    // `children` (passed as props in this file) represents the component nested inside <Store /> in `/pages/index.js` and `/pages/login.js`
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <MagicContext.Provider value={[magic]}>
        <LoadingContext.Provider value={[isLoading, setIsLoading]}>
          <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
            <TokenContext.Provider value={[token, setToken]}>
              {!isLoading ? (
                <div className="flex flex-row">
                  <Layout />
                  {children}
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </TokenContext.Provider>
          </UserInfoContext.Provider>
        </LoadingContext.Provider>
      </MagicContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default Store;
