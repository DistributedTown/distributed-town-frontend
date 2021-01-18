export const getGigs = async (didToken, filter) => {
  const queryParams = filter.isOpen != null ? `?isOpen=${filter.isOpen}` : '';
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig${queryParams}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${didToken}`,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export const getProjects = async didToken => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gig?isOpen=true&isProject=true`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${didToken}`,
        'Content-Type': 'application/json',
      },
    },
  ).then(res => res.json());
};

export const acceptGig = async (didToken, gigId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig/${gigId}/accept`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  }).then(res => res.json());
};

export const createGig = async (didToken, gig) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(gig),
  }).then(res => res.json());
};
