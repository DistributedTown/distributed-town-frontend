import { ethers } from 'ethers';
import communityAbi from '../utils/communityContractAbi.json';
import diToABI from '../utils/distributedTownAbi.json';
import { toWei } from 'web3-utils';

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
    diToABI,
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

export const joinCommunity = async (
  communityAddress,
  url,
  credits
) => {
  try {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    
    // TODO: Create contract should join the user automatically instead of needing to call join after that.
    // call the smart contract to create community
    const contract = new ethers.Contract(
      communityAddress,
      communityAbi,
      signer,
    );
      console.log(contract);
    const createTx = await contract.joinNewMember(
      url,
      toWei(credits.toString())
    );
    console.log(createTx);
    const communityTransactionResult = await createTx.wait();
    console.log(communityTransactionResult);
    const { events } = communityTransactionResult;
    const memberJoinedEvent = events.find(
      e => e.event === 'MemberAdded',
    );

    if (!memberJoinedEvent) {
      throw new Error('Something went wrong');
    } else {
      console.log('MemberAdded');
      return memberJoinedEvent.args[1].toString();
    }

  } catch (err) {
    console.log(err);
    return;
  }
};