import { createContext, useState, useEffect, useContext } from "react";
import { Magic } from "magic-sdk";
import Layout from "./Layout";
import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";

import ditoContractAbi from "../utils/ditoTokenContractAbi.json";
import communityContractAbi from "../utils/communityContractAbi.json";

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
  useEffect(() => {
    setLoggedIn(false);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState("");
  const router = useRouter();

  /*  async function saveCommunityContractToUserContext() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      const contractABI = communityContractAbi;
      const contractAddress = "0x790697f595Aa4F9294566be0d262f71b44b5039c";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setUserInfo({
        ...userInfo,
        communityContract: { address: contractAddress },
      });

    } catch (err) {
      console.log(err);
    }
  }
*/

  useEffect(() => {
    /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
    let m = new Magic("pk_test_1C5A2BC69B7C18E5", {
      network: "ropsten"
    });
    setMagic(m);
  }, []);

  useEffect(() => {
    if (typeof magic !== "undefined") {
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

          console.log("LOGGEDIN");
          console.log(loggedIn);

          // If the user is logged in, get user info from API
          if (loggedIn) {
            const metaData = await magic.user.getMetadata();
            const DIDT = await magic.user.getIdToken({ email: metaData.email });
            const response = await fetch(
              `https://api.distributed.town/api/user`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${DIDT}`
                }
              }
            );
            const userInfoArray = await response.json();
            const userInfo = userInfoArray[0];

            if (
              !userInfo.skills ||
              (userInfo.skills && userInfo.skills.length === 0)
            ) {
              setUserInfo({
                ...userInfo,
                DIDT,
                skills: []
              });
              router.push("/community/join");
            } else if (
              !userInfo.communityContract ||
              (userInfo.communityContract &&
                !userInfo.communityContract.address)
            ) {
              setUserInfo({
                ...userInfo,
                DIDT
              });
              router.push("/SignupPhaseTwo");
            } else {
              const provider = new ethers.providers.Web3Provider(
                magic.rpcProvider
              );
              try {
                const signer = provider.getSigner();

                // Get user's Ethereum public address
                const address = await signer.getAddress();

                const communityContractABI = communityContractAbi;
                const communityContractAddress = userInfo.communityContract
                  ? userInfo.communityContract.address
                  : "0x759A224E15B12357b4DB2d3aa20ef84aDAf28bE7";
                const communityContract = new ethers.Contract(
                  communityContractAddress,
                  communityContractABI,
                  signer
                );

                const ditoContractABI = ditoContractAbi;
                const ditoContractAddress = await communityContract.tokens();
                const ditoContract = new ethers.Contract(
                  ditoContractAddress,
                  ditoContractABI,
                  signer
                );

                // Send transaction to smart contract to update message and wait to finish
                const ditoBalance = await ditoContract.balanceOf(address);

                let ditoBalanceStr = BigNumber.from(ditoBalance).toString();
                ditoBalanceStr = ditoBalanceStr.slice(
                  0,
                  ditoBalanceStr.length - 18
                );

                setUserInfo({
                  ...userInfo,
                  communityContract: { address: communityContractAddress },
                  ditoBalance: ditoBalanceStr,
                  DIDT
                });
                router.push("/skillwallet");
              } catch (error) {
                console.log(error);
              }
            }
          }

          setLoggedIn(loggedIn);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [magic]);

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
