import { BigNumber, ethers } from 'ethers';
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

export const createCommunity = async (didToken, community, user) => {
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

export const getUserBalance = async () => {
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
  const signer = provider.getSigner();

  // Get user's Ethereum public address
  const address = await signer.getAddress();

  const communityContractABI = NoGSNCommunityAbi.abi;

  let communityContractAddress;

  if (userInfo.communityContract)
    communityContractAddress = userInfo.communityContract.address;
  else {
    const getCommRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/community/${userInfo.communityID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${DIDT}`,
        },
      },
    );
    const communityInfo = await getCommRes.json();

    const [{ address: communityAddress }] = communityInfo.addresses.filter(
      ({ blockchain }) => blockchain === 'ETH',
    );
    communityContractAddress = communityAddress;
  }

  const communityContract = new ethers.Contract(
    communityContractAddress,
    communityContractABI,
    signer,
  );

  const ditoContractABI = ditoContractAbi;
  const ditoContractAddress = await communityContract.tokens();
  const ditoContract = new ethers.Contract(
    ditoContractAddress,
    ditoContractABI,
    signer,
  );

  // Send transaction to smart contract to update message and wait to finish
  const ditoBalance = await ditoContract.balanceOf(address);

  let ditoBalanceStr = BigNumber.from(ditoBalance).toString();
  ditoBalanceStr = ditoBalanceStr.slice(0, ditoBalanceStr.length - 18);

  return ditoBalanceStr;
};
