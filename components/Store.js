import { createContext, useState, useEffect, useContext } from 'react';
import { Magic } from 'magic-sdk';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';

import ditoContractAbi from '../utils/ditoTokenContractAbi.json';
import NoGSNCommunityAbi from '../utils/NoGSNCommunity.json';
import { getUserJourney, removeUserJourney } from '../utils/userJourneyManager';

/* initializing context API values */
export const MagicContext = createContext();
export const LoggedInContext = createContext();
export const LoadingContext = createContext();
export const UserInfoContext = createContext();
export const TokenContext = createContext();
let skipEffect = false;

/* this function wraps our entire app within our context APIs so they all have access to their values */
const Store = ({ children }) => {
  const [magic, setMagic] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
    const m = new Magic('pk_test_1C5A2BC69B7C18E5', {
      network: 'ropsten',
      chainId: 8888, // Your own node's chainId
    });
    setMagic(m);
  }, []);

  useEffect(() => {
    if (typeof magic !== 'undefined' && !skipEffect) {
      (async () => {
        try {
          /* If the user has a valid session with our server, it will return {authorized: true, user: user} */
          let loggedIn = false;
          if (magic && magic.user) {
            loggedIn = await magic.user.isLoggedIn();
          }

          /* If db returns {authorized: false}, there is no valid session, so log user out of their session with Magic if it exists */
          // if (!loggedIn) {
          //   await magic.user.logout();
          // }

          console.log('LOGGEDIN');
          console.log(loggedIn);

          // If the user is logged in, get user info from API
          if (loggedIn) {
            // call getFunded
            const metaData = await magic.user.getMetadata();
            console.log(metaData.publicAddress);
            await fetch('/api/getFunded', {
              method: 'POST',
              body: JSON.stringify({ publicAddress: metaData.publicAddress }),
            });
            const DIDT = await magic.user.getIdToken({ email: metaData.email });
            console.log(DIDT);
            setToken(DIDT);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${DIDT}`,
                },
              },
            );
            console.log(response);
            const userInfoArray = await response.json();
            const userInfo = userInfoArray[0];

            const userJourney = getUserJourney();
            let journey = null;
            if (userJourney) {
              journey = userJourney.journey;
            }

            if (
              !userInfo.skills ||
              (userInfo.skills && userInfo.skills.length === 0)
            ) {
              setUserInfo({
                ...userInfo,
                DIDT,
                skills: [],
              });
              if (journey === 'login') {
                router.push('/community/join');
              }
            } else if (!userInfo.communityID) {
              setUserInfo({
                ...userInfo,
                DIDT,
              });
              if (journey === 'login') {
                router.push('/signup/choose-community');
              }
            } else {
              const provider = new ethers.providers.Web3Provider(
                magic.rpcProvider,
              );
              try {
                const signer = provider.getSigner();

                // Get user's Ethereum public address
                const address = await signer.getAddress();

                const communityContractABI = NoGSNCommunityAbi.abi;

                let communityContractAddress;

                if (userInfo.communityContract)
                  communityContractAddress = userInfo.communityContract.address;
                else {
                  const getCommRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/community/${userInfo.communityID}`,
                    {
                      method: 'GET',
                      headers: {
                        Authorization: `Bearer ${DIDT}`,
                      },
                    },
                  );
                  const communityInfo = await getCommRes.json();

                  const [
                    { address: communityAddress },
                  ] = communityInfo.addresses.filter(
                    ({ blockchain }) => blockchain === 'ETH',
                  );
                  communityContractAddress = communityAddress;
                }

                const communityContract = new ethers.Contract(
                  communityContractAddress,
                  communityContractABI,
                  signer,
                );

                const ditoContractABI = ditoContractAbi;
                const ditoContractAddress = await communityContract.tokens();
                const ditoContract = new ethers.Contract(
                  ditoContractAddress,
                  ditoContractABI,
                  signer,
                );

                // Send transaction to smart contract to update message and wait to finish
                const ditoBalance = await ditoContract.balanceOf(address);

                let ditoBalanceStr = BigNumber.from(ditoBalance).toString();
                ditoBalanceStr = ditoBalanceStr.slice(
                  0,
                  ditoBalanceStr.length - 18,
                );

                setUserInfo({
                  ...userInfo,
                  communityContract: { address: communityContractAddress },
                  ditoBalance: ditoBalanceStr,
                  DIDT,
                });
                if (journey === 'login' || !journey) {
                  router.push('/skillwallet');
                }
              } catch (error) {
                console.log(error);
              }
            }
            removeUserJourney();
            skipEffect = true;
          } else {
            const userJourney = getUserJourney();
            if (
              !userJourney &&
              router.pathname !== '/community/join' &&
              router.pathname !== '/community/invite'
            ) {
              router.push('/');
            } else if (userJourney) {
              const { journey, step } = userJourney;
              if (journey === 'community') {
                if (step === 'category') {
                  router.push('/community/create');
                } else {
                  router.push('/community/created');
                }
              }
            }
          }

          setLoggedIn(loggedIn);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      skipEffect = false;
    }
  }, [magic, loggedIn]);

  return (
    // `children` (passed as props in this file) represents the component nested inside <Store /> in `/pages/index.js` and `/pages/login.js`
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <MagicContext.Provider value={[magic]}>
        <LoadingContext.Provider value={[isLoading, setIsLoading]}>
          <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
            <TokenContext.Provider value={[token, setToken]}>
              {!isLoading ? (
                <div className="flex">{children}</div>
              ) : (
                <div className="flex items-center justify-center">
                  Loading...
                </div>
              )}
            </TokenContext.Provider>
          </UserInfoContext.Provider>
        </LoadingContext.Provider>
      </MagicContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default Store;

// http://localhost:3000/community/invite?communityId=01eqdy3jndzjx3rgz2fd4e371p&communityName=Blabla
