import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext,
} from "../components/Store";

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
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8">
      <h1>Congrats!</h1>
      <h2>You are now a member of DiTo!</h2>
      <p>Here are your community credits</p>
      <div className="bg-red-600 rounded-full flex flex-col p-8 items-center justify-center">
        <img src="/dito-tokens.svg" />
        <p>
          {ditoBalance === -1
            ? "Loading dito balance..."
            : `${ditoBalance} DiTo`}
        </p>
      </div>
      <div className="w-full flex justify-center absolute bottom-0 right-0 border-2 border-gray-400">
        <button
          type="button"
          onClick={() => router.push("/skillWallet")}
          className="border-2 border-blue-600 p-2"
        >
          Check your SkillWallet
        </button>
      </div>
    </div>
  );
}

export default SignupCompleted;
