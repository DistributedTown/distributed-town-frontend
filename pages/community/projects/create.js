import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useMagic } from '../../../components/Store';
import Layout from '../../../components/Layout';
import { createGig, getCommunityById } from '../../../api';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import CreateGigForm from '../../../components/gig/CreateGigForm';

function CreateProject() {
  const magic = useMagic();
  const { data: userInfo } = useGetUserInfo();
  const [communityCategory, setCommunityCategory] = useState();
  const router = useRouter();

  async function onSubmit({ title, description, skills, creditsOffered }) {
    const project = {
      title,
      description,
      skills,
      creditsOffered,
      isProject: true,
    };

    const didToken = await magic.user.getIdToken();
    const projectResult = await createGig(didToken, project);
    await router.push('/community/projects');
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
    <Layout
      navBar
      flex
      logo
      splash={{
        color: 'blue',
        variant: 'default',
        alignment: 'left',
        isTranslucent: false,
        fullHeight: false,
      }}
    >
      <div className="w-full p-8 h-full overflow-scroll">
        <h1 className="underline text-black text-4xl">Create New Project</h1>
        <CreateGigForm
          onSubmit={onSubmit}
          communityCategory={communityCategory}
          skill={userInfo.skills[0].skill}
        />
      </div>
      <div className="w-11/12 fixed flex bottom-0 justify-center mt-3 border-t-2 border-gray-600 bg-white z-10">
        <Link href="/community">
          <a className="px-64 py-2 my-2 font-bold text-xl border-2 border-denim">
            Back to Dashboard
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export default CreateProject;
