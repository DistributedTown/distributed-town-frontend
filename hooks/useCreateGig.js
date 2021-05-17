import { useMutation } from 'react-query';
import { createGig } from '../api/gigs';

export const useCreateGig = () => {

  return useMutation(
    async ({ title, description, skills, creditsOffered, isProject }) => {
      const gigData = {
        title,
        description,
        skills,
        creditsOffered,
        isProject,
      };

      // TODO: Throw on !ok
      const result = await createGig(gigData);
    },
    {
      throwOnError: true,
      // TODO: Remove queries
      // onSuccess: () => queryCache.removeQueries(),
    },
  );
};
