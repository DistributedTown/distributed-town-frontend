import queryString from 'query-string';

export const getCommunityById = (didToken, id) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  }).then(res => res.json());
};

export const getCommunities = filter => {
  const { category } = filter;
  const qs = queryString.stringify({ category });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community?${qs}`, {
    method: 'GET',
  }).then(res => res.json());
};

export const createCommunityAndUser = async (didToken, community, user) => {
  const { address, category, name } = community;
  const payload = {
    category,
    addresses: [
      {
        blockchain: 'ETH',
        address,
      },
    ],
    name,
    owner: {
      username: user.username,
      skills: user.skills,
    },
  };
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  }).then(res => res.json());
};
