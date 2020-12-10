import Link from 'next/link';

import Layout from '../../components/Layout';
import CheckupCard from '../../components/community/CheckupCard';

function CommunityDashboard() {
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="flex flex-grow flex-col md:flex-row gap-8">
          <div className="md:w-3/5">
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
          <CheckupCard />
        </div>
        <div className="flex justify-center mt-3">
          <Link href="/skillwallet">
            <a className="w-full text-center py-2 border-2 border-denim">
              Go back to SkillWallet
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default CommunityDashboard;
