import { useQuery } from 'react-query';
import { getCommunities } from '../api/communities';

export const useGetCommunities = filter => {
  return useQuery(['communities', filter], () => getCommunities(filter), {
    enabled: false,
  });
};
