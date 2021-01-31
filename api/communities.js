import queryString from 'query-string';
import { fundUser } from '../api/users';

export const getCommunityById = (id) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
    method: 'GET',
    headers: new Headers({
      skillWalletID: localStorage.getItem('skillWalletID')
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

export const createCommunityAndUser = async (community, user) => {
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
      skillWallet: user.skills,
    },
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
      skillWalletID:localStorage.getItem('skillWalletID')
    },
  });
  const json = await res.json();
  console.log(json);
  localStorage.setItem('skillWalletID', json.skillWalletID);
};
