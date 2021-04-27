import { useMutation } from 'react-query';
import { createGig } from '../api/gigs';
import { storeGigHash } from '../contracts/gigs';

export const useCreateProject = () => {

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
      storeGigHash(result.hash);
    },
    {
      throwOnError: true,
      // TODO: Remove queries
      // onSuccess: () => queryCache.removeQueries(),
    },
  );
};
