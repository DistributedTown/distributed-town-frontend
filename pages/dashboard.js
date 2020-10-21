import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext,
  TokenContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import Button from "../components/Button";

import communityContractAbi from "../utils/communityContractAbi.json";
import { Router, useRouter } from "next/router";

function Dashboard() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [token, setToken] = useContext(TokenContext);
  const [numOfMembers, setNumOfMembers] = useState(-1);
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(-1);

  async function getCommunityInfo() {
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
      // Send transaction to smart contract to update message and wait to finish
      const [nUsers, investedBalance] = await Promise.all([
        contract.numberOfMembers(),
        contract.getInvestedBalance(),
      ]);

      setNumOfMembers(BigNumber.from(nUsers).toNumber());
      setLiquidityPoolBalance(BigNumber.from(investedBalance).toNumber());
    
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    (async () => {
      await getCommunityInfo();
    })();
  }, []);

  const router = useRouter();

  return (
    <div className="w-full flex-col h-screen flex">
    <div className="flex flex-row flex-grow h-6/8">
      <div className="flex flex-col w-3/5 space-y-8 px-8 py-5 mt-2">
         <h1 className="underline text-center text-black text-4xl">Community Dashboard</h1>
        <h2 className="font-bold text-xl text-center">Administration</h2>
        <div className="flex flex-row">
        <div className="w-1/5"></div>
        <div className="flex flex-col w-3/5 justify-center space-y-8">
        <Button onClick={() => router.push("/CommunityTreasury")}>Community Treasury</Button>
        <Button onClick={() => router.push("/gigs")}>Open Gigs</Button>
        <Button>Projects & Proposals</Button>
        </div> 
        <div className="w-1/5"></div>
        </div>
      </div>
      <div className="bg-blue-100 flex w-2/5 justify-center items-center">
          <div className="flex flex-col border-2 border-blue-600">
            <div className="bg-blue-600 p-4">
              <h2>{userInfo.communityId}</h2>
              <p>Check-up Card</p>
            </div>
            <div className="flex flex-col justify-center bg-white p-4 space-y-4">
              <div className="flex flex-row justify-between">
                <p>Members</p>
                <p>{numOfMembers === -1 ? "Loading members..." : numOfMembers}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Open Proposals</p>
                <p>0</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Liquidity Pool</p>
                <p>
                  {liquidityPoolBalance === -1
                    ? "Loading liquidity pool balance..."
                    : liquidityPoolBalance}
                </p>
              </div>
              <div className="flex flex-col border-2 border-blue-600 p-4">
                <p>Scarcity score</p>
                <p>72</p>
              </div>
            </div>
          </div>
        </div>
  </div>
      <div className="flex flex-row h-2/8 my-5 justify-center">
           <Button className="p-4 w-full max-w-none" onClick={() => router.push("/skillWallet")}>Go back to  SkillWallet</Button>
      
      </div> 
    </div>
  );
}

export default Dashboard;
