import { useMutation } from 'react-query';
import { createGig } from '../api';
import { useMagic } from '../components/MagicStore';

export const useCreateGig = () => {
  const magic = useMagic();

  return useMutation(
    async ({ title, description, skills, creditsOffered, isProject }) => {
      const gigData = {
        title,
        description,
        skills,
        creditsOffered,
        isProject,
      };

      const didToken = await magic.user.getIdToken();
      // TODO: Throw on !ok
      await createGig(didToken, gigData);
    },
    {
      throwOnError: true,
      // TODO: Remove queries
      // onSuccess: () => queryCache.removeQueries(),
    },
  );
};
