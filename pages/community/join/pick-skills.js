import { useRouter } from 'next/router';
import { useCreateUser } from '../../../hooks/useCreateUser';
import SkillPicker from '../../../components/SkillPicker';
import SkillWallet from '../../../utils/skillWallet/skillWallet';

function PickSkills() {
  const router = useRouter();
  const { categorySkill } = router.query;
  const [createUser, { isLoading }] = useCreateUser();

  const createSkillWallet = async (user) => {
    await SkillWallet.init(window.ethereum.selectedAddress);
    const skillWalletID = await SkillWallet.store(user);
    localStorage.setItem('skillWalletID', skillWalletID);
  }

  const onSubmit = async ({ username, skills, category }) => {
    const user = { username, skillWallet: skills };
    await createSkillWallet(user);
    await router.push(
      `/community/join/choose-community?category=${encodeURIComponent(
        category,
      )}`,
    );
  };

  return (
    <SkillPicker
      isSubmitting={isLoading}
      categorySkill={categorySkill}
      onSubmit={onSubmit}
    />
  );
}

export default PickSkills;
