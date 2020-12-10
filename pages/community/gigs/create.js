import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import Layout from '../../../components/Layout';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import { useMagic } from '../../../components/Store';
import { createGig, getCommunityById } from '../../../api';

function CreateGig() {
  const [communityCategory, setCommunityCategory] = useState();
  const magic = useMagic();
  const { data: userInfo } = useGetUserInfo();
  const router = useRouter();

  async function onSubmit({ title, description, skills, creditsOffered }) {
    const gig = {
      title,
      description,
      skills,
      creditsOffered,
      isProject: false,
    };

    const didToken = await magic.user.getIdToken();
    const resultGig = await createGig(didToken, gig);
    await router.push('/community/gigs');
  }

  const getCommunityCategory = async () => {
    const didToken = await magic.user.getIdToken();
    const community = await getCommunityById(didToken, userInfo.communityID);
    setCommunityCategory(community.category);
  };

  useEffect(() => {
    if (!userInfo) return;

    getCommunityCategory();
  }, [userInfo]);

  // TODO: Loading
  if (!userInfo) return null;

  return (
    <Layout>
      <div className="w-full p-8 h-full overflow-scroll bg-white">
        <h1 className="underline text-black text-4xl">Create New Gig</h1>
        <CreateGigForm
          onSubmit={onSubmit}
          communityCategory={communityCategory}
          skill={userInfo.skills[0].skill}
        />
      </div>
    </Layout>
  );
}

export default CreateGig;
