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
  const { data: userInfo } = useGetUserInfo();
  const { data: gigs } = useGetGigs();

  return (
    <Layout>
      <div className="grid m-8 gap-8">
        <PageTitle>Open Gigs</PageTitle>
        <div className="mt-5 grid lg:grid-cols-2 xl:grid-cols-3 gap-12 items-baseline">
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
        <Link href="/community/gigs/create">
          <Button filled>
            <a className="flex gap-2 justify-center items-center">
              <p className="text-2xl mb-2">Create new gig</p>
              <FaPlusCircle />
            </a>
          </Button>
        </Link>
        <SkillsDisplay skills={userInfo && userInfo.skills} />
      </div>
    </Layout>
  );
}

export default Gigs;
