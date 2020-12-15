import { useRouter } from 'next/router';
import { useCreateUser } from '../../../hooks/useCreateUser';
import SkillPicker from '../../../components/SkillPicker';

function PickSkills() {
  const router = useRouter();
  const { categorySkill } = router.query;
  const [createUser, { isLoading }] = useCreateUser();

  const onSubmit = async ({ username, skills }) => {
    await createUser({ username, communityID: '', skills });
    await router.push('/community/join/choose-community');
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
