import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
} from "../components/Store";

import { useContext, useState } from "react";
import CommunityCard from "../components/CommunityCard";

import communityContractAbi from "../utils/communityContractAbi.json";

import { ethers } from "ethers";
import { useRouter } from "next/router";

const communities = [
  { name: "Bruh", members: 22, isAccepting: true, scarcityScore: 69 },
];

function SignupPhaseTwo() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const router = useRouter();

  async function joinCommunity() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await provider.getBalance(address) // Balance is in wei
      );

      const contractABI = communityContractAbi;
      const contractAddress = "0x790697f595Aa4F9294566be0d262f71b44b5039c";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Send transaction to smart contract to update message and wait to finish
      const tx = await contract.join(30);

      // Wait for transaction to finish
      const receipt = await tx.wait();

      router.push("/SignupCompleted");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-8 container mx-auto bg-blue-100 p-8 h-screen">
          <h1>Here's a few communities for you!</h1>
          {communities.map((community, i) => (
            <CommunityCard key={i} {...community} />
          ))}
        </div>
        <div className="flex flex-col justify-between space-y-8 w-full flex-grow p-8 h-screen">
          <h1>The credit you will earn with your skills</h1>
          <p>Description of the process</p>
          <div className="border-2 border-blue-600 p-4 flex flex-col space-y-4">
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <p>Skill A</p>
                <p>60%</p>
              </div>
              <div className="flex space-x-2">
                <img src="/dito-tokens.svg" />
                <p>54 DiTo</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <p>Skill B</p>
                <p>40%</p>
              </div>
              <div className="flex space-x-2">
                <img src="/dito-tokens.svg" />
                <p>32 DiTo</p>
              </div>
            </div>
          </div>

          <div className="w-full border-2 border-gray-400">
            <button type="button" onClick={joinCommunity}>
              Join and get your credits!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPhaseTwo;
