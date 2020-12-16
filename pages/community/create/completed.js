import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import WelcomeToCommunity from '../../../components/WelcomeToCommunity';

function CreateCompleted() {
  const {
    query: { communityName },
  } = useRouter();

  return (
    <Layout>
      <WelcomeToCommunity showInviteButton communityName={communityName} />
    </Layout>
  );
}

export default CreateCompleted;
