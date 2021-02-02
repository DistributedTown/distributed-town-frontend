import { useEffect, useState } from 'react';
// import { useCreateCommunityState } from '.';
import Layout from '../../../components/Layout';
import WelcomeToCommunity from '../../../components/WelcomeToCommunity';

function CreateCompleted() {
  const [community, setCommunity] = useState({});
  useEffect(() => {
    const com = localStorage.getItem('create-community');
    setCommunity(JSON.parse(com));
  })

  return (
    <Layout>
      <WelcomeToCommunity showInviteButton communityName={community.name} />
    </Layout>
  );
}

export default CreateCompleted;
