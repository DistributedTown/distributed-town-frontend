import { useContext } from 'react';
import { useQuery } from 'react-query';
import { getUserInfo } from '../api';
import { MagicContext } from '../components/Store';

export const useGetCommunities = () => {
  const [magic] = useContext(MagicContext);

  return useQuery(
    'communities',
    async () => {
      const didToken = await magic.user.getIdToken();
      const userInfo = await getUserInfo(didToken);

      const communitiesToAdd = new Map();
      // TODO: Refactor
      await Promise.all(
        (userInfo.skills || []).map(({ skill }) => {
          return fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/community?skill=${skill}`,
            {
              method: 'GET',
            },
          ).then(res => res.json());
        }),
      ).then(communityLists =>
        communityLists.forEach(communityList => {
          communityList.forEach(community => {
            if (!communitiesToAdd.has(community._id)) {
              communitiesToAdd.set(community._id, community);
            }
          });
        }),
      );

      console.log('VALUES', Array.from(communitiesToAdd.values()));

      return Array.from(communitiesToAdd.values());
    },
    { enabled: false },
  );
};
