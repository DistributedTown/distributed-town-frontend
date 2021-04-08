

export const getUserInfo = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet?address=${window.ethereum.selectedAddress}`, {
    method: 'GET',
  })
    .then(res => res.json());
};



export const getCommunityInfo = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet/community?address=${window.ethereum.selectedAddress}`, {
    method: 'GET',
  })
    .then(res => res.json());
};