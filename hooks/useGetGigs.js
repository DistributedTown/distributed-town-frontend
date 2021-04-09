import { useQuery } from 'react-query';
import { getGigs } from '../api/gigs';

export const useGetGigs = ({ isOpen } = { isOpen: true }) => {

  return useQuery(['gigs', isOpen], async () => {
    return getGigs({ isOpen });
  });
};
