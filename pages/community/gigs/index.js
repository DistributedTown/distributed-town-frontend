import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import GigCard from '../../../components/gig/GigCard';
import SkillsDisplay from '../../../components/SkillsDisplay';
import Button from '../../../components/Button';
import { getGigs } from '../../../api/gigs';

import Layout from '../../../components/Layout';
import PageTitle from '../../../components/PageTitle';

function Gigs(props) {
  const [gigs, setGigs] = useState(undefined);
  const [skillWallet, setSkillWallet] = useState(undefined);
  useEffect(() => {

    const fetchData = async () => {
      const sw = JSON.parse(localStorage.getItem('skillWallet'));
      const g = await getGigs(sw.community);
      setGigs(g.gigs)
      setSkillWallet(sw);
    }
    fetchData();
  }, [])
  return (
    <Layout color="#BD413B">
      <div className="grid gap-8 m-8">
        <div className="flex justify-between items-center">
          <PageTitle>Open Gigs</PageTitle>
          <div>
            <Link href="/community/gigs/create" as="/community/gigs/create">
              <Button className="border-2 border-burgundy rounded-full">
                <a className="flex items-center justify-center space-x-2">
                  <p className="mb-2 text-2xl text-burgundy">Create new gig</p>
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
              return <GigCard key={gig.id} gig={gig} />;
            })
          )}
        </div>
        {skillWallet &&
          <SkillsDisplay skills={skillWallet.skills} />
        }
      </div>
    </Layout>
  );
}

export default Gigs;
