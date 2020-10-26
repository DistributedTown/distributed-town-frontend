import {
  MagicContext,
  UserInfoContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import Button from "../components/Button";

import communityContractAbi from "../utils/communityContractAbi.json";
import { Router, useRouter } from "next/router";
function CommunityTreasury() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);

  const router = useRouter();

  const [isJoining, setIsJoining] = useState(false);

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => {
      await getCommunityInfo();
    })();
  }, []);
  
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

  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-col flex-grow space-y-8 px-8 py-4">
        <h1>Add funds to Treasury</h1>
        <div className='flex flex-col flex-grow '>
          <div>
            <strong>Currency</strong>
            <p>DAI</p>
            <strong>USDC</strong>
            <p>
              Stablecoins are not regular<br></br>
            crypto. They are "pegged" to <br></br>
            Fiat (USD), so they are not<br></br>
            volatile (they are stable):<br></br>
            1 DAI = 1 Dollar<br></br>
            1 USDC = 1 Dollar<br></br>
            </p>
          </div>

          <div>
            <strong>Community API</strong>
            <p>
            "Staking" is different from<br></br>
            "Donating" - basically your  <br></br>
            community is "looking" these<br></br>
            funds to provide liquidity. In<br></br>
            exchange, you all get a higher<br></br>
            interest return!<br></br>
            </p>
          </div>
        </div>

        <div className='flex flex-col flex-grow '>
          <div>
            <strong>Amount</strong>
            <strong>500</strong>
            <strong>DAI/USDC</strong>
            <p>
              The amount of tokens you <br></br>
            stake for your community <br></br>
            </p>
          </div>

          <div>
            <strong>Your return</strong>
            <p>17.15 USD</p>
            <p>
            It is based on the size of your <br></br>
            staking, and the amount of DiTo  <br></br>
            you own!<br></br>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 flex flex-grow justify-center items-center">
        <div className="flex flex-col border-2 border-blue-600">
          <div className="bg-blue-600 p-4">
            {/* <h2>{userInfo.communityContract.name}</h2> */}
            <h2>asdasdas</h2>
            <p>Check-up Card</p>
          </div>
          <div className="flex flex-col justify-center bg-white p-4 space-y-4">
            <div className="flex flex-row justify-between">
              <p>Members</p>
              <p>5</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>Open Proposals</p>
              <p>0</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>Liquidity Pool</p>
              <p>
                3k
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

export default CommunityTreasury;
