import { BigNumber, ethers } from 'ethers';
import communityContractAbi from '../utils/communityContractAbi.json';
import communitiesABI from '../utils/communitiesRegistryAbi.json';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';
import { pushJSONDocument } from '../utils/textile.hub';

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
