import { useMutation } from 'react-query';
import { acceptGig } from '../api/gigs';

export const useTakeGig = () => {

  return useMutation(
    async id => {
      await acceptGig(id);
    },
    { throwOnError: true },
  );
};
