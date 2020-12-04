export const authenticateWithDb = didToken => {
  /* Pass the Decentralized ID token in the Authorization header to the database */
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  });
};

export const getUserInfo = didToken => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  }).then(res => res.json());
};

export const getCommunityById = (didToken, id) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  }).then(res => res.json());
};
