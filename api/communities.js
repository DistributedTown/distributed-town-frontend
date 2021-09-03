import queryString from 'query-string';
import { ethers } from 'ethers';
import communityAbi from '../utils/communityContractAbi.json';

export const join = async (payload) => {
  console.log(payload);
  const credits =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const creditsJson = await credits.json();
  console.log(creditsJson);
  return creditsJson;
}


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

export const createCommunity = async (community) => {
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
    ownerID: localStorage.getItem('skillWalletID')
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  console.log(json);
};

export const getCommunityGigsAddress = async (communityAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
      communityAddress,
      communityAbi,
      signer,
    );
    
    const gigsAddress = await contract.gigsAddr();
    
    return gigsAddress
  } catch (err) {
    console.log(err);
    return;
  }
}