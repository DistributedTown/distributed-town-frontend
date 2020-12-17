import { BigNumber, ethers } from 'ethers';
import communityContractAbi from '../utils/communityContractAbi.json';
import communitiesABI from '../utils/communitiesRegistryAbi.json';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';

export const getCommunityDitoTokensContract = async (
  rpcProvider,
  communityContractAddress,
) => {
  const provider = new ethers.providers.Web3Provider(rpcProvider);
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
  rpcProvider,
  ditoContractAddress,
) => {
  const provider = new ethers.providers.Web3Provider(rpcProvider);
  const signer = provider.getSigner();
  // Get user's Ethereum public address
  const address = await signer.getAddress();

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

export const joinCommunity = async (
  rpcProvider,
  communityContractAddress,
  ditos,
) => {
  const provider = new ethers.providers.Web3Provider(rpcProvider);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    communityContractAddress,
    communityContractAbi,
    signer,
  );

  const tx = await contract.join(ditos);
  await tx.wait();
};

export const createCommunity = async rpcProvider => {
  const provider = new ethers.providers.Web3Provider(rpcProvider);
  const signer = provider.getSigner();

  // TODO: Create contract should join the user automatically instead of needing to call join after that.
  // call the smart contract to create community
  console.log(
    'REGISTRY ADDRESS',
    process.env.NEXT_PUBLIC_COMMUNITIES_REGISTRY_ADDRESS,
  );
  const contract = new ethers.Contract(
    // TODO: Extract in env.js and refactor
    process.env.NEXT_PUBLIC_COMMUNITIES_REGISTRY_ADDRESS,
    communitiesABI,
    signer,
  );

  const estimatedGas = await contract.estimateGas.createCommunity();
  const createTx = await contract.createCommunity({
    // 500k gas
    gasLimit: ethers.BigNumber.from(estimatedGas).toNumber(), // 3896496,
    gasPrice: 7910854493,
  });
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
