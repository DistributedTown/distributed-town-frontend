import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import Button from "../components/Button";

import communityContractAbi from "../utils/communityContractAbi.json";

function Dashboard() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

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

  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-col flex-grow space-y-8 px-8 py-4">
        <h1>Community Dashboard</h1>
        <h2>Administration</h2>
        <Button>Community Treasury</Button>
        <Button>Open Gigs</Button>
        <Button>Projects & Proposals</Button>
      </div>
      <div className="bg-blue-100 flex flex-grow justify-center items-center">
        <div className="flex flex-col border-2 border-blue-600">
          <div className="bg-blue-600 p-4">
            <h2>DiTo #23</h2>
            <p>Check-up Card</p>
          </div>
          <div className="flex flex-col justify-center bg-white p-4 space-y-4">
            <div className="flex flex-row justify-between">
              <p>Members</p>
              <p>{numOfMembers === -1 ? "Loading members..." : numOfMembers}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>Open Proposals</p>
              <p>3</p>
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
  );
}

export default Dashboard;
