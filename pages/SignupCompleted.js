import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext
} from "../components/Store";
import Layout from "../components/Layout";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import { router, useRouter } from "next/router";

import ditoContractAbi from "../utils/ditoTokenContractAbi.json";
import communityContractAbi from "../utils/communityContractAbi.json";

function SignupCompleted() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const [ditoBalance, setDitoBalance] = useState(-1);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

      try {
        const signer = provider.getSigner();

        // Get user's Ethereum public address
        const address = await signer.getAddress();

        const communityContractABI = communityContractAbi;
        const communityContractAddress =
          userInfo.communityContract.address ||
          "0x759A224E15B12357b4DB2d3aa20ef84aDAf28bE7";
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
        ditoBalanceStr = ditoBalanceStr.slice(0, ditoBalanceStr.length - 18);

        setDitoBalance(ditoBalanceStr);
        setUserInfo({ ...userInfo, ditoBalance: ditoBalanceStr });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const router = useRouter();

  return (
    <Layout
      navBar
      logo
      splash={{
        color: "alizarin",
        variant: "quad",
        alignment: "left"
      }}
    >
      <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
        <div className="flex-1 text-center flex items-center flex-col">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <h2 className="text-4xl">You are now a member of DiTo!</h2>
          <p className="text-orange text-3xl mt-8">
            Here are your community credits
          </p>
          <div className="bg-red-600 rounded-full flex flex-col p-8 items-center justify-center h-64 w-64 mt-4">
            <img src="/dito-tokens.svg" />
            <p className="text-orange mt-4">
              {ditoBalance === -1
                ? "Loading dito balance..."
                : `${ditoBalance} DiTo`}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center bottom-0 right-0 border-2 border-gray-400 py-4 px-48">
          <button
            type="button"
            onClick={() => router.push("/skillwallet")}
            className="border-2 border-blue-600 p-2 w-full text-2xl font-bold"
          >
            Check your SkillWallet
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default SignupCompleted;
