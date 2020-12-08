import { useQuery } from 'react-query';
import { getCommunities } from '../api';

export const useGetCommunities = () => {
  return useQuery('communities', getCommunities, { enabled: false });
};
