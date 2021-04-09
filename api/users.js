

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

export const hasPendingAuthentication = async (address) => {
  const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet/hasPendingAuth?address=${address}`, {
    method: 'GET',
  });
  const pendingAuths = await response.json();
  console.log(pendingAuths);
  return pendingAuths.hasPendingAuth;
};