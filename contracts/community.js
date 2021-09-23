import { ethers } from 'ethers';
import communityAbi from './abis/communityContractAbi.json';
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

export const getSkillWalletAddress = async (communityAddress) => {
  // try {
  //   const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  //   const signer = provider.getSigner();
    
  //   console.log('communityAddress', communityAddress);
  //   const contract = new ethers.Contract(
  //     communityAddress,
  //     communityAbi,
  //     signer,
  //   );
    
  //   const skillWalletAddress = await contract.getSkillWalletAddress();
  //   console.log(skillWalletAddress);
  //   return skillWalletAddress
  // } catch (err) {
  //   console.log(err);
  //   return;
  // }

  // TODO: remove and uncomment the code for fetching it when the contracts are redeployed. (there was a bug!)
  return '0x1e79bE396CE37F7eB43aF0Ef0ffb3124F3fD23eF';
}