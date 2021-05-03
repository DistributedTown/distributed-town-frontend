import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import GigCard from '../../../components/gig/GigCard';
import SkillsDisplay from '../../../components/SkillsDisplay';
import Button from '../../../components/Button';

import Layout from '../../../components/Layout';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import PageTitle from '../../../components/PageTitle';
import { useGetGigs } from '../../../hooks/useGetGigs';

function Gigs() {
  const { data: userInfo } = useGetUserInfo(localStorage.getItem('tokenId'));;
  const { data: gigs } = useGetGigs();

  return (
    <Layout>
      <div className="grid gap-8 m-8">
        <div className="flex justify-between items-center">
          <PageTitle>Open Gigs</PageTitle>
          <div>
            <Link href="/community/gigs/create">
              <Button filled>
                <a className="flex items-center justify-center space-x-2">
                  <p className="mb-2 text-2xl">Create new gig</p>
                </a>
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid items-baseline gap-12 mt-5 lg:grid-cols-2 xl:grid-cols-3">
          {typeof gigs === 'undefined' ? (
            <div>
              <h2>Loading Open Gigs...</h2>
            </div>
          ) : gigs.length === 0 ? (
            <h2>There are no Open Gigs.</h2>
          ) : (
            gigs.map(gig => {
              return <GigCard key={gig._id} gig={gig} />;
            })
          )}
        </div>
        <SkillsDisplay skills={userInfo && userInfo.skillWallet} />
      </div>
    </Layout>
  );
}

export default Gigs;
