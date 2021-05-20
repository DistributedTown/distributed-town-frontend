

export const getUserInfo = (tokenId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet?tokenId=${tokenId}`, {
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

export const generateNonce = async (action, tokenId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillWallet/${tokenId}/nonces?action=${action}`, {
    method: 'POST'
  });
  const nonce = await response.json();
  console.log(nonce);
  return nonce.nonce;
}