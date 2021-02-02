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
    console.log('aaaa');
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
    if (!window.ethereum.selectedAddress)
      window.ethereum.enable()

    await fundUser(window.ethereum.selectedAddress)
    const user = { username, skills };
    await createCommunity({
      name: community.name,
      category: community.category,
      description: community.description,
      user,
    });
    await router.push(`/community/create/completed`);
  };


  const getCommunityCategory = () => {
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
    return item.category;
  }
  return ( 
    <SkillPicker
      isSubmitting={isLoading}
      communityCategory={getCommunityCategory}
      onSubmit={handleSubmit}
    />
  );
}

export default PickSkills;
