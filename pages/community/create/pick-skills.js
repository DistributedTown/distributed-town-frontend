import { useRouter } from 'next/router';
import SkillPicker from '../../../components/SkillPicker';
import { useCreateCommunity } from '../../../hooks/useCreateCommunity';

function PickSkills() {
  const router = useRouter();
  const { communityName, communityCategory } = router.query;
  const [createCommunity, { isLoading }] = useCreateCommunity();

  const handleSubmit = async ({ username, skills }) => {
    const user = { username, skills };
    await createCommunity({
      name: communityName,
      category: communityCategory,
      user,
    });
    await router.push(
      `/community/create/completed?communityName=${encodeURIComponent(
        communityName,
      )}`,
    );
  };

  if (!communityName || !communityCategory) return null;

  return (
    <SkillPicker
      isSubmitting={isLoading}
      communityCategory={communityCategory}
      onSubmit={handleSubmit}
    />
  );
}

export default PickSkills;
