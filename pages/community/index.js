import { useContext, useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import Link from 'next/link';
import {
  MagicContext,
  UserInfoContext,
  TokenContext,
} from '../../components/Store';

import Layout from '../../components/Layout';
import CheckupCard from '../../components/community/CheckupCard';
import NoGSNCommunityAbi from '../../utils/NoGSNCommunity.json';

function CommunityDashboard() {
  const [userInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  const [token] = useContext(TokenContext);
  const [numOfMembers, setNumOfMembers] = useState();
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState();

  async function getCommunityInfo() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    try {
      const contractAddress = userInfo.communityContract.address;
      const contractABI = NoGSNCommunityAbi.abi;
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      );

      // Send transaction to smart contract to update message and wait to finish
      const [nUsers, investedBalanceInfo] = await Promise.all([
        contract.numberOfMembers(),
        contract.getInvestedBalanceInfo(),
      ]);

      console.log(BigNumber.from(nUsers).toNumber(), '1');
      console.log(
        ethers.utils.formatUnits(investedBalanceInfo.investedBalance, 18),
        '2',
      );

      setNumOfMembers(BigNumber.from(nUsers).toNumber());
      setLiquidityPoolBalance(
        Math.round(
          (Number(
            ethers.utils.formatUnits(investedBalanceInfo.investedBalance, 18),
          ) +
            Number.EPSILON) *
            100,
        ) / 100,
      );
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
    <Layout
      navBar
      flex
      logo
      splash={{
        color: 'blue',
        variant: 'default',
        alignment: 'left',
        isTranslucent: false,
        fullHeight: false,
      }}
    >
      <div className="w-full">
        <div style={{ height: '90%' }} className="flex">
          <div className="w-3/5">
            <h1 className="mt-12 underline text-center text-black text-4xl">
              Community Dashboard
            </h1>
            <h2 className="mt-10 font-bold text-xl text-center">
              Administration
            </h2>
            <div
              style={{ height: '40%' }}
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
              <Link href="/community/projects">
                <a className="w-2/3 text-center py-2 border-2 border-denim">
                  Projects & Proposals
                </a>
              </Link>
            </div>
          </div>
          <CheckupCard
            numOfMembers={numOfMembers}
            liquidityPoolBalance={liquidityPoolBalance}
            communityId={userInfo.communityID}
            token={token}
          />
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
