import { useRouter } from 'next/router';
import RegistrationModal from '../../../components/RegistrationModal';
import { useMagicLinkLogin } from '../../../hooks/useMagicLinkLogin';

const Invitation = () => {
  const router = useRouter();
  const { communityId, communityName, communitySkill } = router.query;
  const [login] = useMagicLinkLogin();

  const handleCreateAccountClick = async email => {
    await login(email);
    await router.push(
      `/community/invitation/pick-skills?communityId=${encodeURIComponent(
        communityId,
      )}&communitySkill=${encodeURIComponent(
        communitySkill,
      )}&communityName=${encodeURIComponent(communityName)}`,
    );
  };

  return (
    <RegistrationModal
      communityName={communityName}
      chosenSkill={communitySkill}
      handleCreateAccountClick={handleCreateAccountClick}
    />
  );
};

export default Invitation;
