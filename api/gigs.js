export const getGigs = async (filter) => {
  const queryParams = filter.isOpen != null ? `?isOpen=${filter.isOpen}` : '';
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig${queryParams}`, {
    method: 'GET',
    headers: {
      skillWalletID:localStorage.getItem('skillWalletID'),
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export const getProjects = async () => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gig?isOpen=true&isProject=true`,
    {
      method: 'GET',
      headers: {
        skillWalletID:localStorage.getItem('skillWalletID'),
        'Content-Type': 'application/json',
      },
    },
  ).then(res => res.json());
};

export const acceptGig = async (gigId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig/${gigId}/accept`, {
    method: 'POST',
    headers: new Headers({
      skillWalletID:localStorage.getItem('skillWalletID')
    }),
  }).then(res => res.json());
};

export const createGig = async (gig) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
    method: 'POST',
    headers: new Headers({
      // TODO: add token
      skillWalletID:localStorage.getItem('skillWalletID'),
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(gig),
  }).then(res => res.json());
};
