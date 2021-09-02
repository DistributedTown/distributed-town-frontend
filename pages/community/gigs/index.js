import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import GigCard from '../../../components/gig/GigCard';
import SkillsDisplay from '../../../components/SkillsDisplay';
import Button from '../../../components/Button';
import { gigs as mockGigs } from '../../../utils/mockData';

import Layout from '../../../components/Layout';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import PageTitle from '../../../components/PageTitle';
import { useGetGigs } from '../../../hooks/useGetGigs';

function Gigs(props) {
  // const { data } = mockUserInfo;
  // const { data: gigs } = useGetGigs();     // TODO: uncommment this before pushing
  const { gigs } = mockGigs;        // TODO: delete this before pushing

  return (
    <Layout color="#BD413B">
      <div className="grid gap-8 m-8">
        <div className="flex justify-between items-center">
          <PageTitle>Open Gigs</PageTitle>
          <div>
            <Link href="/community/gigs/create">
              <Button className="border-2 border-burgundy rounded-full">
                <a className="flex items-center justify-center space-x-2">
                  <p className="mb-2 text-2xl text-burgundy">Create new gig</p>
                </a>
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid items-baseline gap-12 mt-5 lg:grid-cols-2 xl:grid-cols-3">
          {typeof mockGigs === 'undefined' ? (
            <div>
              <h2>Loading Open Gigs...</h2>
            </div>
          ) : mockGigs.length === 0 ? (
            <h2>There are no Open Gigs.</h2>
          ) : (
            mockGigs.map(gig => {
              return <GigCard key={gig.gigId} gig={gig} />;
            })
          )}
        </div>
        <SkillsDisplay />
      </div>
    </Layout>
  );
}

export default Gigs;
