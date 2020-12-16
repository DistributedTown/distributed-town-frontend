import { useQuery } from 'react-query';
import { getCommunities } from '../api';

export const useGetCommunities = filter => {
  return useQuery(['communities', filter], () => getCommunities(filter), {
    enabled: false,
  });
};
