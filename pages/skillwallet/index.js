import Link from 'next/link';

import { useState, useEffect } from 'react';

import { useMagic } from '../../components/Store';

import Layout from '../../components/Layout';
import { getGigs } from '../../api';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useGetDitoBalance } from '../../hooks/useGetDitoBalance';

function SkillWallet() {
  const magic = useMagic();
  const [pastGigs, setPastGigs] = useState([]);
  const { data: ditoBalance } = useGetDitoBalance();
  const { data: userInfo } = useGetUserInfo();

  useEffect(() => {
    (async () => {
      const didToken = await magic.user.getIdToken();
      const gigs = await getGigs(didToken, { isOpen: true });
      setPastGigs(gigs);
    })();
  }, []);

  if (!userInfo) {
    return null;
  }

  return (
    <Layout
      flex
      navBar
      logo
      splash={{
        color: 'denim',
        variant: 'quad',
        alignment: 'left',
      }}
    >
      <div className="w-full flex flex-col h-full overflow-scroll">
        {/* MAIN TITLE  */}
        <div className="w-1/8 ml-5 my-4">
          <h1 className="underline text-black text-4xl">Skill Wallet</h1>
        </div>

        <div className="w-full grid md:grid-cols-2">
          {/*  WALLET CARD  */}
          <div className="row-span-2 p-3 rounded-lg border border-denim m-3">
            <div className="flex flex-col">
              {/* PROFILE */}
              <div className="flex h-3/8 text-white bg-black rounded p-3 mb-3">
                <div className="flex w-1/3 items-center justify-center">
                  <p className="text-4xl">👨</p>
                </div>
                <div className="flex flex-col w-1/8 items-left   justify-start">
                  <h3 className="text-white font-bold">{userInfo.username}</h3>
                  <h3 className="text-white">{userInfo.email}</h3>
                </div>
              </div>
              {/*  <!--COMMUNITIES--> */}
              <div className="h-2/8 flex px-3 py-4 mb-4 flex-col items-center justify-center border border-denim">
                <h1 className="lg:text-3xl xs:text-xs text-xl w-3/4 font-bold ">
                  Your community:
                </h1>
                <Link href="community">
                  <div className="bg-denim py-3 w-3/4 text-white text-center cursor-pointer">
                    <p>DITO #23</p>
                  </div>
                </Link>
              </div>
              {/*  <!--QR-CODE--> */}
              <div className="flex h-2/8 p-4 items-center justify-center border border-denim">
                <p>
                  Show{' '}
                  <Link href="/skillwallet/qr">
                    <a className="underline text-denim">Wallet's QR-Code</a>
                  </Link>
                  to help a different community.
                </p>
              </div>
              {/*  <!--BALANCE--> */}
              <div className="flex h-1/4 p-3 mb-3">
                <div className="flex w-1/2 items-center justify-center">
                  <p className="text-xl">
                    <span className="underline">Credits</span> you earned.
                  </p>
                </div>
                <div className="flex flex-col w-1/2 p-3 items-center   justify-start">
                  <img src="dito-tokens.svg" />
                  <h2 className="font-bold p-3">
                    {ditoBalance === -1
                      ? 'Loading dito balance...'
                      : `${ditoBalance} DiTo`}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* BADGES AND PAST GIGS */}
          <div className="flex flex-col w-5/7 space-y-8">
            {/*  <!--BADGES --> */}
            <div className="flex flex-col">
              <h1 className="w-1/3 text-center text-black p-3 border border-denim ">
                By Badges
              </h1>

              <div className="flex flex-row">
                <div className="flex flex-row justify-around p-3 w-2/3">
                  {/*  <!--BADGE--> */}
                  <div className="flex w-16 h-16 sm:text-2xl md:text-3xl lg:text-5xl lg:w-32 lg:h-32">
                    <div className="m-2 w-full flex justify-center items-center">
                      <img src="Badge1.svg" />
                    </div>
                  </div>
                  <div className="flex w-16 h-16 sm:text-2xl md:text-3xl lg:text-5xl lg:w-32 lg:h-32">
                    <div className="m-2 w-full flex justify-center items-center">
                      <img src="Badge2.svg" />
                    </div>
                  </div>
                  <div className="flex w-16 h-16 sm:text-2xl md:text-3xl lg:text-5xl lg:h-32 lg:w-32 ">
                    <div className="flex items-center justify-center w-full m-2 flex justify-center items-center">
                      <img src="Badge3.svg" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-1/3">
                  <div className="p-3 w-full">
                    <p className="pr-4">
                      Badges will appear here once you validate your skills.
                      Check the{' '}
                      <a className="text-denim underline" href="#">
                        Open Gigs
                      </a>{' '}
                      and validate your Skills now!
                    </p>{' '}
                  </div>
                </div>
              </div>
            </div>

            {/*  <!--PAST GIGS --> */}
            <div className="flex flex-col ">
              <h1 className="w-1/3 text-center text-black p-3 border border-denim ">
                Past Gigs
              </h1>
              <div className="flex flex-row flex-wrap justify-start  py-2 mr-5">
                {Array.isArray(pastGigs) ? (
                  pastGigs.map((gig, i) => {
                    return (
                      <div key={i} className="flex w-1/3 h-1/2">
                        <div className="flex-row border border-denim m-1 w-full flex justify-center items-center">
                          <div className="flex flex-col h-full p-2 w-1/2">
                            <h3>{gig.title}</h3>
                            <p className="text-xs">{gig.description}</p>
                            <h3>Skills Used</h3>
                            <div className="flex flex-col flex-wrap text-xs">
                              {gig.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="p-1"
                                >{`#${skill}`}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col w-1/2 h-full p-2">
                            <div className="flex flex-col h-1/2 h-full">
                              <h3 className="font-bold text-xs lg:text-base text-carrot">
                                Rate Received
                              </h3>
                              <h3 className="text-black">7/10</h3>
                            </div>
                            <div className="flex flex-col h-1/2 h-full">
                              <h3 className="font-bold text-xs lg:text-base text-carrot">
                                Credits Received
                              </h3>
                              <h3 className="text-black">6 Dito</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-black">Past Gigs Loading...</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SkillWallet;
