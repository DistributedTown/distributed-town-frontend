// import { useRouter } from 'next/router';
// import RegistrationModal fro../../components/RegistrationModaldal';

// const Invitation = () => {
//   const router = useRouter();
//   const { communityId, communityName, communitySkill } = router.query;

//   const handleCreateAccountClick = async () => {
//     await router.push(
//       `/community/invitation/pick-skills?communityId=${encodeURIComponent(
//         communityId,
//       )}&communitySkill=${encodeURIComponent(
//         communitySkill,
//       )}&communityName=${encodeURIComponent(communityName)}`,
//     );
//   };

//   return (
//     <RegistrationModal
//       communityName={communityName}
//       chosenSkill={communitySkill}
//       handleCreateAccountClick={handleCreateAccountClick}
//     />
//   );
// };

// export default Invitation;
