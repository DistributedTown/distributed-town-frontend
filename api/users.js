export const login = didToken => {
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
  })
    .then(res => res.json())
    .then(arr => arr[0]);
};

export const createUser = (didToken, { username, communityID, skills }) => {
  const user = {
    username,
    communityID,
    skills,
  };
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json());
};

export const updateUserCommunityID = (didToken, communityID) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'PUT',
    body: JSON.stringify({ communityID }),
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
      'Content-Type': 'application/json',
    }),
  });
};

export const fundUser = publicAddress => {
  return fetch('/api/getFunded', {
    method: 'POST',
    body: JSON.stringify({ publicAddress }),
  });
};

export const getInvitation = async didToken =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/invite`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${didToken}`,
    },
  }).then(res => res.json());
