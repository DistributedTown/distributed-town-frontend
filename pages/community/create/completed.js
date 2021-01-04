import { useCreateCommunityState } from '.';
import Layout from '../../../components/Layout';
import WelcomeToCommunity from '../../../components/WelcomeToCommunity';

function CreateCompleted() {
  const [{ communityName }] = useCreateCommunityState();

  return (
    <Layout>
      <WelcomeToCommunity showInviteButton communityName={communityName} />
    </Layout>
  );
}

export default CreateCompleted;
