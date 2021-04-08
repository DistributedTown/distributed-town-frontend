import { useRouter } from 'next/router';
// import { useCreateCommunityState } from '.';
import SkillPicker from '../../../components/SkillPicker';
import { useCreateCommunity } from '../../../hooks/useCreateCommunity';
import { fundUser } from '../../../api/users';
import { useEffect, useState } from 'react';

function PickSkills() {
  const router = useRouter();
  const [createCommunity, { isLoading }] = useCreateCommunity();
  const [community, setCommunity] = useState();
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('create-community'));

    if (!item) {
      console.log('no item')
      router.push(`/community/create`);
      return;
    }
    if (!item.name || !item.category || !item.description) {
      console.log('no item prop')
      router.push(`/community/create`);
      return;
    }
    setCommunity({
      name: item.name,
      category: item.category,
      description: item.description
    });
  }, [])


  const handleSubmit = async ({ username, skills }) => {
    console.log('handle submit');
    localStorage.setItem('skillSet', skills);

    localStorage.setItem('username', username);
   // await fundUser(window.ethereum.selectedAddress)

    // TODO create community flow 
    // await createCommunity({
    //   name: community.name,
    //   category: community.category,
    //   description: community.description,
    //   user,
    // });
    await router.push(`/community/create/completed`);
  };

  return (
    <SkillPicker
      isSubmitting={isLoading}
      onSubmit={handleSubmit}
      communityCategory={router.query.category}
    />
  );
}

export default PickSkills;
