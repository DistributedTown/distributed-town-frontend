import Link from 'next/link';

import { FaQrcode, FaUser } from 'react-icons/fa';

import Layout from '../../components/Layout';
import { useGetGigs } from '../../hooks/useGetGigs';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useGetDitoBalance } from '../../hooks/useGetDitoBalance';
import { useGetCommunity } from '../../hooks/useGetCommunity';
import Card from '../../components/Card';
import Button from '../../components/Button';

function SkillWallet() {
  const { data: ditoBalance } = useGetDitoBalance();
  const { data: userInfo } = useGetUserInfo();
  const { data: community } = useGetCommunity();
  // TODO: Are these pastGigs?
  const { data: pastGigs } = useGetGigs();

  return (
    <Layout>
      <div className="w-full flex flex-col h-full">
        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-6 m-6">
          {/* MAIN TITLE  */}
          <div className="col-span-1 lg:col-span-2">
            <h1 className="underline text-black text-4xl">Skill Wallet</h1>
          </div>

          {/*  WALLET CARD  */}
          <Card className="row-span-2 content-between flex flex-col gap-10">
            {/* PROFILE */}
            <Card filled color="black" className="flex gap-6 text-white">
              <div className="flex justify-center items-center w-24 h-24 bg-white rounded-full text-black">
                <FaUser size="5rem" />
              </div>
              <div className="grid content-center">
                <h3 className="text-white font-bold">
                  {userInfo ? userInfo.username : '...'}
                </h3>
                <h3 className="text-white">
                  {userInfo ? userInfo.email : '...'}
                </h3>
              </div>
            </Card>
            {/*  <!--COMMUNITIES--> */}
            <div className="flex items-center justify-center gap-4">
              <p className="text-xl font-bold ">Your community:</p>
              <Link href="community">
                <Button filled textColor="white">
                  <a>{community ? community.communityInfo.name : '...'}</a>
                </Button>
              </Link>
            </div>
            {/*  <!--QR-CODE--> */}
            <div className="flex items-center justify-center gap-6">
              <FaQrcode size="3rem" />
              <p className="text-center">
                Show your{' '}
                <Link href="/skillwallet/qr">
                  <a className="underline text-denim">Wallet's QR-Code</a>
                </Link>
                <br />
                to help a different community.
              </p>
            </div>
            {/*  <!--BALANCE--> */}
            <div className="grid place-items-center grid-cols-2 mx-auto">
              <p className="text-xl row-span-2">Your credits:</p>
              <img src="dito-tokens.svg" />
              <h2 className="font-bold p-3">
                {ditoBalance
                  ? `${ditoBalance} DiTo`
                  : 'Loading dito balance...'}
              </h2>
            </div>
          </Card>
          {/*  <!--BADGES --> */}
          <Card>
            <h1 className="text-xl mb-6 text-center text-black">Badges</h1>
            <p className="pr-4 text-sm text-center mb-8">
              Badges will appear here once you validate your skills. Check the{' '}
              <a className="text-denim underline" href="#">
                Open Gigs
              </a>{' '}
              and validate your Skills now!
            </p>

            <div className="flex gap-8 justify-center">
              {/*  <!--BADGE--> */}
              <img src="Badge1.svg" className="w-20 h-20" />
              <img src="Badge2.svg" className="w-20 h-20" />
              <img src="Badge3.svg" className="w-20 h-20" />
            </div>
          </Card>

          {/*  <!--PAST GIGS --> */}
          <Card>
            <h1 className="text-xl mb-6 text-center text-black">Past Gigs</h1>
            {pastGigs ? (
              <div className="flex flex-wrap">
                {pastGigs.map((gig, i) => {
                  return (
                    <Card key={i} className="flex">
                      <div className="w-1/2">
                        <h3 className="text-lg">{gig.title}</h3>
                        <p className="text-xs mb-4">{gig.description}</p>
                        <h3>Skills Used</h3>
                        <ul className="flex-wrap text-xs list-disc ml-6">
                          {gig.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-1/2">
                        <div className="flex flex-col mb-4">
                          <h3 className="font-bold text-xs lg:text-base text-carrot">
                            Rate Received
                          </h3>
                          <h3 className="text-black">7/10</h3>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-xs lg:text-base text-carrot">
                            Credits Received
                          </h3>
                          <h3 className="text-black">6 Dito</h3>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <h1 className="text-center text-black">Loading gigs...</h1>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default SkillWallet;
