export const authenticateWithDb = didToken => {
  /* Pass the Decentralized ID token in the Authorization header to the database */
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  });
};
