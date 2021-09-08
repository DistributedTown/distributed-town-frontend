import queryString from 'query-string';
import { ethers } from 'ethers';
import communityAbi from '../utils/communityContractAbi.json';

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