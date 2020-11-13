import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext,
  TokenContext
} from "../../components/Store";
import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import Link from "next/link";

import Layout from "../../components/Layout";
import Button from "../../components/Button";
import CheckupCard from "../../components/community/CheckupCard";
import communityContractAbi from "../../utils/communityContractAbi.json";
import { Router, useRouter } from "next/router";

function CommunityDashboard() {
  // const [userInfo, setUserInfo] = useContext(UserInfoContext);
  // const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  // const [magic] = useContext(MagicContext);
  // const [token, setToken] = useContext(TokenContext);
  const [numOfMembers, setNumOfMembers] = useState(-1);
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(-1);

  async function getCommunityInfo() {
    // const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      const contractABI = communityContractAbi;
      const contractAddress =
        userInfo.communityContract.address ||
        "0x790697f595Aa4F9294566be0d262f71b44b5039c";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Send transaction to smart contract to update message and wait to finish
      const [nUsers, investedBalance] = await Promise.all([
        contract.numberOfMembers(),
        contract.getInvestedBalance()
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
    <Layout
      bgImage={{ src: "/background-image.svg", alignment: "right", size: "40" }}
      navBar
      flex
      logo
      splash={{
        color: "blue",
        variant: "default",
        alignment: "left",
        isTranslucent: false,
        fullHeight: false
      }}
    >
      <div className="w-full">
        <div style={{ height: "90%" }} className="flex">
          <div className="w-3/5">
            <h1 className="mt-12 underline text-center text-black text-4xl">
              Community Dashboard
            </h1>
            <h2 className="mt-10 font-bold text-xl text-center">
              Administration
            </h2>
            <div
              style={{ height: "40%" }}
              className="flex flex-col mt-8 items-center justify-around"
            >
              <Link href="/community/treasury">
                <a className="w-2/3 text-center py-2 border-2 border-denim">
                  Community Treasury
                </a>
              </Link>
              <Link href="/community/gigs">
                <a className="w-2/3 text-center py-2 border-2 border-denim">
                  Open Gigs
                </a>
              </Link>
              <Link href="/">
                <a className="w-2/3 text-center py-2 border-2 border-denim">
                  Projects & Proposals
                </a>
              </Link>
            </div>
          </div>
          <CheckupCard />
        </div>
        <div className="flex justify-center mt-3">
          <Link href="/skillwallet">
            <a className="px-64 py-2 border-2 border-denim">
              Go back to SkillWallet
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default CommunityDashboard;
