import queryString from 'query-string';

export const getCommunityById = (id) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
    method: 'GET'
  }).then(res => res.json());
};

export const getCommunities = filter => {
  const { category } = filter;
  const qs = queryString.stringify({ category });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community?${qs}`, {
    method: 'GET',
  }).then(res => res.json());
};
