import Link from 'next/link';
import classNames from 'classnames';

import { FaQrcode, FaUser } from 'react-icons/fa';

import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import { useEffect, useState } from 'react';

function PlaceholderLoading({
  className,
  color = 'gray-400',
  width = '100%',
  height = '1.8rem',
}) {
  const classes = classNames(
    `w-full h-full rounded-xl animate-pulse bg-${color}`,
    className,
  );
  return <div className={classes} style={{ width, height }} />;
}

function SkillWallet() {
  const pastGigs = [];
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem('skillWallet');
    setUserInfo(JSON.parse(info));
  }, [])

  return (
    <Layout color="#146EAA">
      <div className="flex flex-col w-full h-full">
        {/* Layout */}
        <div className="grid gap-6 m-6 lg:grid-cols-2">
          {/* MAIN TITLE  */}
          <div className="col-span-1 lg:col-span-2">
            <PageTitle>Skill Wallet</PageTitle>
          </div>

          {userInfo ? (
            < Card className="flex flex-col content-between row-span-2 space-y-10">
              <Card filled color="black" className="flex space-x-6 text-white">
                <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full text-denim">
                  <img src={userInfo.imageUrl} size="4.5rem" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <h3 className="font-bold text-white">
                    {userInfo ? (
                      userInfo.nickname
                    ) : (
                      <PlaceholderLoading color="white" width="10rem" />
                    )}
                  </h3>
                </div>
              </Card>
              <div className="flex items-center justify-center space-x-4">
                <p className="text-xl font-bold ">Your community:</p>
                <Link href="community">
                  <Button filled textColor="white">
                    {userInfo ? (
                      <a>{userInfo.currentCommunity.name}</a>
                    ) : (
                      <a></a>
                    )}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center space-x-6">
                <FaQrcode size="3rem" />
                <p className="text-center">
                  Show your{' '}
                  <Link href="/skillwallet/qr">
                    <a className="text-denim">Wallet's QR-Code</a>
                  </Link>
                  <br />
                  to help a different community.
                </p>
              </div>
              <div className="grid grid-cols-2 mx-auto place-items-center">
                <p className="row-span-2 text-xl">Your credits:</p>
                <img src="dito-tokens.svg" />
                <h2 className="p-3 font-bold">
                  {userInfo
                    ? `${userInfo.diToCredits} DiTo`
                    : 'Loading dito balance...'}
                </h2>
              </div>
            </Card>
          )
            : undefined}
          {/*  <!--BADGES --> */}
          <Card>
            <h1 className="mb-6 text-xl text-center text-black">Badges</h1>
            <p className="pr-4 mb-8 text-sm text-center">
              Badges will appear here once you validate your skills. Check the{' '}
              <Link href="/community/gigs">
                <a className="text-denim">Open Gigs</a>
              </Link>{' '}
              and validate your Skills now!
            </p>

            <div className="flex justify-center space-x-8">
              {/*  <!--BADGE--> */}
              <img src="Badge1.svg" className="w-20 h-20" />
              <img src="Badge2.svg" className="w-20 h-20" />
              <img src="Badge3.svg" className="w-20 h-20" />
            </div>
          </Card>

          {/*  <!--PAST GIGS --> */}
          <Card>
            <h1 className="mb-6 text-xl text-center text-black">Past Gigs</h1>
            {pastGigs ? (
              <>
                {pastGigs.length === 0 && (
                  <p className="text-center">No past gigs</p>
                )}
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(300px, 1fr))',
                  }}
                >
                  {pastGigs.map((gig, i) => {
                    return (
                      <Card key={i} className="flex" outlined>
                        <div className="w-1/2">
                          <h3 className="text-lg">{gig.title}</h3>
                          <p className="mb-4 text-xs">{gig.description}</p>
                          <h3>Skills Used</h3>
                          <ul className="flex-wrap ml-6 text-xs list-disc">
                            {gig.skills.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <div className="flex flex-col mb-4">
                            <h3 className="text-xs font-bold lg:text-base text-carrot">
                              Rate Received
                            </h3>
                            <h3 className="text-black">7/10</h3>
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-xs font-bold lg:text-base text-carrot">
                              Credits Received
                            </h3>
                            <h3 className="text-black">6 Dito</h3>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <h1 className="text-center text-black">Loading gigs...</h1>
            )}
          </Card>
        </div>
      </div>
    </Layout >
  );
}

export default SkillWallet;
