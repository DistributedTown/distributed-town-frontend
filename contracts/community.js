import { BigNumber, ethers } from 'ethers';
import communityContractAbi from '../utils/communityContractAbi.json';
import communitiesABI from '../utils/communitiesRegistryAbi.json';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';

export const getCommunityDitoTokensContract = async (
  communityContractAddress,
) => {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();

  const communityContract = new ethers.Contract(
    communityContractAddress,
    communityContractAbi,
    signer,
  );

  const ditoContractAddress = await communityContract.tokens();
  return ditoContractAddress;
};

export const getDitoContractUserBalance = async (
  ditoContractAddress,
) => {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  // Get user's Ethereum public address
  const address = await signer.getAddress();

  console.log(ditoContractAddress);
  const ditoContract = new ethers.Contract(
    ditoContractAddress,
    ditoContractAbi,
    signer,
  );

  // Send transaction to smart contract to update message and wait to finish
  const ditoBalance = await ditoContract.balanceOf(address);

  let ditoBalanceStr = BigNumber.from(ditoBalance).toString();
  ditoBalanceStr = ditoBalanceStr.slice(0, ditoBalanceStr.length - 18);

  return ditoBalanceStr;
};

export const isLoggedIn = () => {
  return false;
}

export const joinCommunity = async (
  communityContractAddress,
  ditos,
) => {

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  
  // Wallet connected to a provider
  console.log(process.env.NEXT_PUBLIC_MNEMONIC)
  const senderWalletMnemonic = ethers.Wallet.fromMnemonic(
    process.env.NEXT_PUBLIC_MNEMONIC,
    "m/44'/60'/0'/0/0"
  );

  let signer = senderWalletMnemonic.connect(provider);

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COMMUNITIES_REGISTRY_ADDRESS,
    communitiesABI,
    signer,
  );

  let tx = undefined;

  // const communitiesCount = await contract.numOfCommunities();
  // console.log(communitiesCount);

  // const addresses = await contract.getCommunities();
  // console.log(addresses);

  // if (isLoggedIn) {
  //   const skillWalletId = localStorage.getItem('skillWalletTokenId');
  //   tx = await contract.joinExistingSW(communityContractAddress, skillWalletId, ditos);
  // } else {
  const skills = localStorage.getItem('skills');
  const skillsJson = JSON.parse(skills);
  const url = 'https://hub.textile.io/thread/bafkwfcy3l745x57c7vy3z2ss6ndokatjllz5iftciq4kpr4ez2pqg3i/buckets/bafzbeiaorr5jomvdpeqnqwfbmn72kdu7vgigxvseenjgwshoij22vopice';
  console.log(skillsJson)
  console.log(communityContractAddress)
  console.log(ditos)
  tx = await contract.joinNewMember(communityContractAddress, {
    skill1: { level: 2, displayStringId: 1 },
    skill2: { level: 3, displayStringId: 2 },
    skill3: { level: 4, displayStringId: 3 }
  }, url, ditos);


  // }
  await tx.wait();
};

export const createCommunity = async () => {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);

  const signer = provider.getSigner();
  // TODO: Create contract should join the user automatically instead of needing to call join after that.
  // call the smart contract to create community
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COMMUNITIES_REGISTRY_ADDRESS,
    communitiesABI,
    signer,
  );

  const createTx = await contract.createCommunity();

  // Wait for transaction to finish
  const communityTransactionResult = await createTx.wait();
  const { events } = communityTransactionResult;
  const communityCreatedEvent = events.find(
    e => e.event === 'CommunityCreated',
  );

  if (!communityCreatedEvent) {
    throw new Error('Something went wrong');
  }
  const communityAddress = communityCreatedEvent.args[0];
  return communityAddress;
};
