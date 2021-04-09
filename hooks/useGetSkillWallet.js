import { useQuery } from 'react-query';
import { getSkillWallet } from '../api/skills';

export const useGetSkillWallet = () => {

  return useQuery('skillWallet', async () => {
    return getSkillWallet();
  });
};
