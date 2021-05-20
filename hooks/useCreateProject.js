import { useMutation } from 'react-query';
import { createProject } from '../api/projects';

export const useCreateProject = () => {

  return useMutation(
    async ({ url, template, communityAddress }) => {
      const projectData = {
        url,
        template,
        communityAddress,
      };
      const result = await createProject(projectData);
    },
    {
      throwOnError: true,
    },
  );
};
