import { useRouter } from 'next/router';
import { useCreateCommunityState } from '.';
import SkillPicker from '../../../components/SkillPicker';
import { useCreateCommunity } from '../../../hooks/useCreateCommunity';

function PickSkills() {
  const [
    { communityName, communityCategory, communityDescription },
    setCreateState,
  ] = useCreateCommunityState();
  const [createCommunity, { isLoading }] = useCreateCommunity();
  const router = useRouter();

  const handleSubmit = async ({ username, skills }) => {
    const user = { username, skills };
    await createCommunity({
      name: communityName,
      category: communityCategory,
      user,
    });
    await router.push(`/community/create/completed`);
  };

  if (!communityName || !communityCategory || !communityCategory) {
    router.push(`/community/create`);
  }

  return (
    <SkillPicker
      isSubmitting={isLoading}
      communityCategory={communityCategory}
      onSubmit={handleSubmit}
    />
  );
}

export default PickSkills;
