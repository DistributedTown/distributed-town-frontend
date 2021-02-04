import { useRouter } from 'next/router';
// import { useCreateCommunityState } from '.';
import SkillPicker from '../../../components/SkillPicker';
import { useCreateCommunity } from '../../../hooks/useCreateCommunity';
import { fundUser } from '../../../api/users';
import { useEffect, useState } from 'react';
import SkillWallet from '../../../utils/skillWallet/skillWallet';

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
    if (!window.ethereum.selectedAddress)
      window.ethereum.enable()

    await fundUser(window.ethereum.selectedAddress)
    const user = { username, skillWallet: skills };
    await createSkillWallet(user);

    await createCommunity({
      name: community.name,
      category: community.category,
      description: community.description,
      user,
    });
    await router.push(`/community/create/completed`);
  };

  const createSkillWallet = async (user) => {
    await SkillWallet.init(window.ethereum.selectedAddress);
    const skillWalletID = await SkillWallet.store(user);
    localStorage.setItem('skillWalletID', skillWalletID);
    console.log(router.query.category);
  }

  return (
    <SkillPicker
      isSubmitting={isLoading}
      onSubmit={handleSubmit}
    />
  );
}

export default PickSkills;
