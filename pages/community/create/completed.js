import { useCreateCommunityState } from '.';
import Layout from '../../../components/Layout';
import WelcomeToCommunity from '../../../components/WelcomeToCommunity';

function CreateCompleted() {
  const [community] = useCreateCommunityState();

  return (
    <Layout>
      <WelcomeToCommunity showInviteButton communityName={community.name} />
    </Layout>
  );
}

export default CreateCompleted;
