import { BigNumber, ethers } from 'ethers';
import queryString from 'query-string';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';
import NoGSNCommunityAbi from '../utils/NoGSNCommunity.json';

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

export const getCommunityById = (didToken, id) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${didToken}`,
    }),
  }).then(res => res.json());
};

export const getCommunities = filter => {
  console.log('FILTER', filter);
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

export const getSkillTreeBySkill = skill => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill?skill=${encodeURIComponent(
      skill,
    )}`,
    { method: 'GET' },
  ).then(res => res.json());
};

export const getSkillTreeByCategory = category => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill?category=${encodeURIComponent(
      category,
    )}`,
    { method: 'GET' },
  ).then(res => res.json());
};

export const getSkillWallet = didToken => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  }).then(res => res.json());
};

export const createUser = (didToken, { username, communityID, skills }) => {
  const user = {
    username,
    // TODO: Remove this hardcoded id
    communityID: communityID || '01eqdy3jndzjx3rgz2fd4e371p',
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
