import { useMutation } from 'react-query';
import { createProject } from '../api/projects';
import { storeGigHash } from '../contracts/gigs';

export const useCreateProject = () => {

  return useMutation(
    async ({ url, template, communityAddress }) => {
      const projectData = {
        url,
        template,
        communityAddress,
      };
      const result = await createProject(projectData);
      storeGigHash(result.hash);
    },
    {
      throwOnError: true,
    },
  );
};
