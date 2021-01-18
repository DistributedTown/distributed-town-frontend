import { useQuery } from 'react-query';
import { getSkillWallet } from '../api/skills';
import { useMagic } from '../components/MagicStore';

export const useGetSkillWallet = () => {
  const magic = useMagic();

  return useQuery('skillWallet', async () => {
    const didToken = await magic.user.getIdToken();
    return getSkillWallet(didToken);
  });
};
