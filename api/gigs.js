export const getGigs = async (communityAddress) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${communityAddress}/gigs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export const getProjects = async () => {
  return fetch(
    // TODO: pass community!
    `${process.env.NEXT_PUBLIC_API_URL}/api/community/0xF0F8AEC4D3552a0BE4D797EA93aE20dB8F643b99/project`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(res => res.json());
};

export const acceptGig = async (gigId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig/${gigId}/accept`, {
    method: 'POST'
  }).then(res => res.json());
};

// export const createGig = async (gig) => {
//   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
//     method: 'POST',
//     headers: new Headers({
//       // TODO: add token
//       'Content-Type': 'application/json',
//     }),
//     body: JSON.stringify(gig),
//   }).then(res => res.json());
// };
