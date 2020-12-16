import { useQuery } from 'react-query';
import { getGigs } from '../api';
import { useMagic } from '../components/Store';

export const useGetGigs = ({ isOpen } = { isOpen: true }) => {
  const magic = useMagic();

  return useQuery(['gigs', isOpen], async () => {
    const didToken = await magic.user.getIdToken();
    return getGigs(didToken, { isOpen });
  });
};
