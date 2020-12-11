import { useRouter } from 'next/router';
import SkillPicker from '../../../components/SkillPicker';

export default function PickSkills() {
  const router = useRouter();
  const { categorySkill, communityId } = router.query;

  const onSubmit = () => {};

  // TODO: Refactor
  if (!communityId) return 'No community id';

  return <SkillPicker categorySkill={categorySkill} onSubmit={onSubmit} />;
}
