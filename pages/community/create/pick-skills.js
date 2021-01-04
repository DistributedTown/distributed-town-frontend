import { useRouter } from 'next/router';
import { useCreateCommunityState } from '.';
import SkillPicker from '../../../components/SkillPicker';
import { useCreateCommunity } from '../../../hooks/useCreateCommunity';

function PickSkills() {
  const [community] = useCreateCommunityState();
  const [createCommunity, { isLoading }] = useCreateCommunity();
  const router = useRouter();

  const handleSubmit = async ({ username, skills }) => {
    const user = { username, skills };
    await createCommunity({
      name: community.name,
      category: community.category,
      description: community.description,
      user,
    });
    await router.push(`/community/create/completed`);
  };

  if (!community.name || !community.category || !community.description) {
    router.push(`/community/create`);
  }

  return (
    <SkillPicker
      isSubmitting={isLoading}
      communityCategory={community.category}
      onSubmit={handleSubmit}
    />
  );
}

export default PickSkills;
