import { useMutation } from 'react-query';
import { createProject } from '../api/projects';
import { storeGigHash } from '../contracts/gigs';

export const useCreateProject = () => {

  return useMutation(
    async ({ title, description, skills, funds }) => {
      const projectData = {
        title,
        description,
        skills,
        funds
      };
      const result = await createProject(gigData);
      storeGigHash(result.hash);
    },
    {
      throwOnError: true,
    },
  );
};
