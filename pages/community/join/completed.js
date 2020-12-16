import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import WelcomeToCommunity from '../../../components/WelcomeToCommunity';

function JoinCompleted() {
  const {
    query: { communityName },
  } = useRouter();

  return (
    <Layout>
      <WelcomeToCommunity communityName={communityName} />
    </Layout>
  );
}

export default JoinCompleted;
