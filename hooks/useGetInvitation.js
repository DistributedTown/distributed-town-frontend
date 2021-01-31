import { useQuery } from 'react-query';
import { getInvitation } from '../api/users';

export const useGetInvitation = () => {

  return useQuery('inviteLink', async () => {
    return getInvitation();
  });
};
