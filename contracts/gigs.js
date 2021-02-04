import { BigNumber, ethers } from 'ethers';
import communityContractAbi from '../utils/communityContractAbi.json';
import gigRegistryAbi from '../utils/GigsRegistryAbi.json';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';


export const storeGigHash = async (hash) => {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  // TODO: Create contract should join the user automatically instead of needing to call join after that.
  // call the smart contract to create community
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_GIG_REGISTRY_ADDRESS,
    gigRegistryAbi,
    signer,
  );


  const createTx = await contract.createGig(hash);
    console.log(createTx)
  // Wait for transaction to finish
  const gigTransactionResult = await createTx.wait();
  const { events } = gigTransactionResult;
  console.log(events);
  const gigCreatedEvent = events.find(
    e => e.event === 'GigCreated',
  );

  if (!gigCreatedEvent) {
    throw new Error('Something went wrong');
  } 
};
