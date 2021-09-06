import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import CheckupCard from '../../components/community/CheckupCard';
import CommunitySummaryCard from '../../components/community/CommunitySummaryCard';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import { getCommunityInfo, getUserInfo } from '../../api/users';
import { useRouter } from 'next/router';
function CommunityDashboard() {
  const router = useRouter();
  useEffect(() => {
    const getInfo = async () => {
      //TODO: this shouldn't be hard-coded
      const skillWallet = JSON.parse(localStorage.getItem('skillWallet'));

      if (!skillWallet || !skillWallet.tokenId) {
        router.push(`/`);
      } else {
        const info = await getUserInfo(skillWallet.tokenId);
        localStorage.setItem('userInfo', JSON.stringify(info));
        const community = await getCommunityInfo(skillWallet.currentCommunity.address);
        localStorage.setItem('community', JSON.stringify(community));
      }
    }
    getInfo();
  }, []);

  return (
    <Layout color="#146EAA">
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-grow space-y-8 md:flex-row md:space-y-0">
          <div className="grid content-center p-8 md:w-3/5">
            <h2 className="mt-12 text-lg text-center">
              Welcome to your <strong className="underline">diTown Hall</strong>
            </h2>
            <p className="italic mt-5 text-l text-center">
              where everything happens
            </p>
            <div className="flex flex-col mt-16 space-y-4">
              <Link href="/community/gigs">
                <Button>
                  <a>Open Gigs</a>
                </Button>
              </Link>
              {/* <Link href="/community/projects"> */}
              <Button disabled={true}>
                <a>Projects</a>
              </Button>
              {/* </Link> */}
              {/* <Link href="/community/treasury"> */}
              <Button disabled={true}>
                <a>Treasury</a>
              </Button>
              {/* </Link> */}
            </div>
          </div>
          <div>

          </div>
          {/* <CheckupCard /> */}
          <CommunitySummaryCard />
        </div>
        {/* <div className="bg-white flex justify-center pt-1 pb-1">              
              <Link href="./skillwallet" disabled>
                <Button className="w-3/5">
                  <a>Go To Skillwallet</a>
                </Button>
              </Link>
        </div> */}
      </div>
    </Layout>
  );
}

export default CommunityDashboard;
