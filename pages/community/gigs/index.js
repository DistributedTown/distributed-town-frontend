import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import GigCard from '../../../components/gig/GigCard';
import SkillsDisplay from '../../../components/SkillsDisplay';
import Button from '../../../components/Button';

import Layout from '../../../components/Layout';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import { acceptGig, getGigs } from '../../../api';
import { useMagic } from '../../../components/Store';

function Gigs() {
  const magic = useMagic();
  const { data: userInfo } = useGetUserInfo();
  const [openGigs, setOpenGigs] = useState();

  useEffect(() => {
    (async () => {
      const didToken = await magic.user.getIdToken();
      const gigsResponse = await getGigs(didToken, { isOpen: true });
      setOpenGigs(gigsResponse);
    })();
  }, []);

  const takeGig = async gigId => {
    const didToken = await magic.user.getIdToken();
    await acceptGig(didToken, gigId);
  };

  // TODO: Loading
  if (!userInfo) return null;

  return (
    <Layout>
      <div className="grid m-8 gap-8">
        <h1 className="underline text-black text-4xl">Open Gigs</h1>
        <div className="mt-5 grid lg:grid-cols-2 xl:grid-cols-3 gap-12 items-baseline">
          {typeof openGigs === 'undefined' ? (
            <div>
              <h2>Loading Open Gigs...</h2>
            </div>
          ) : openGigs.length === 0 ? (
            <h2>There are no Open Gigs.</h2>
          ) : (
            openGigs.map(gig => {
              return <GigCard key={gig._id} gig={gig} takeGig={takeGig} />;
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
        <SkillsDisplay skills={userInfo.skills} />
      </div>
    </Layout>
  );
}

export default Gigs;
