import Link from 'next/link';

import Layout from '../../components/Layout';
import CheckupCard from '../../components/community/CheckupCard';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';

function CommunityDashboard() {
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="flex flex-grow flex-col md:flex-row gap-8">
          <div className="grid content-center md:w-3/5">
            <PageTitle className="mt-12 text-center">
              Community Dashboard
            </PageTitle>
            <h2 className="mt-10 font-bold text-xl text-center">
              Administration
            </h2>
            <div className="flex flex-col w-2/3 gap-10 mt-8 m-auto">
              <Link href="/community/gigs">
                <Button>
                  <a>Open Gigs</a>
                </Button>
              </Link>
              <Link href="/community/treasury">
                <Button disabled>
                  <a>Community Treasury</a>
                </Button>
              </Link>
              <Link href="/community/projects">
                {/* TODO: Coming soon! */}
                <Button disabled>
                  <a>Projects & Proposals</a>
                </Button>
              </Link>
            </div>
          </div>
          <CheckupCard />
        </div>
      </div>
    </Layout>
  );
}

export default CommunityDashboard;
