import { useQuery } from 'react-query';
import queryString from 'query-string';

export const useGetSkills = ({ category, skill }, { enabled }) => {
  const qs = queryString.stringify({ category, skill });
  return useQuery(
    ['skillTree', qs],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill?${qs}`).then(res =>
        res.json(),
      ),
    { enabled },
  );
};
