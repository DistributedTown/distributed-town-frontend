// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { getCommunityById } from '../../api/communities';
// import SkillPicker from '../../components/SkillPicker';
// import { useCreateUser } from '../../hooks/useCreateUser';
// import { useJoinCommunity } from '../../hooks/useJoinCommunity';

// // TODO: Refactor invitation flow
// export default function PickSkills() {
//   const router = useRouter();
//   const { communityId } = router.query;
//   const [createUser] = useCreateUser();
//   const [joinCommunity] = useJoinCommunity();
//   const [communityCategory, setCommunityCategory] = useState();

//   useEffect(() => {
//     (async () => {
//       const community = await getCommunityById(communityId);
//       setCommunityCategory(community.category);
//     })();
//   }, []);

//   const onSubmit = async ({ username, skills }) => {
//     // TODO: Use one request for this.
//     await createUser({ username, skills });
//     const community = await getCommunityById(communityId);
//     await joinCommunity({
//       _id: community._id,
//       address: community.addresses.find(a => a.blockchain === 'ETH').address,
//     });
//     await router.push('/skillwallet');
//   };

//   if (!communityId) return 'No community id';
//   if (!communityCategory) return 'No category';

//   return (
//     <SkillPicker communityCategory={communityCategory} onSubmit={onSubmit} />
//   );
// }
