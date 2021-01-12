import Link from 'next/link';

import Layout from '../../components/Layout';
import CheckupCard from '../../components/community/CheckupCard';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';

function CommunityDashboard() {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-grow flex-y-8 md:flex-row md:flex-y-0">
          <div className="grid content-center p-8 md:w-3/5">
            <PageTitle className="mt-12 text-center">
              Community Dashboard
            </PageTitle>
            <h2 className="mt-10 text-xl font-bold text-center">
              Administration
            </h2>
            <div className="flex flex-col mt-8 flex-y-10">
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
