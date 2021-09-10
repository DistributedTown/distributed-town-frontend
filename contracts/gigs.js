import { ethers } from 'ethers';
import { toWei } from 'web3-utils';
import gigsABI from './abis/gigsABI.json';
import { pushJSONDocument } from '../utils/textile.hub'

export const createGig = async (formikValues, user, gigsAddress, budget) => {
  try {
    console.log(formikValues, user);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gigsAddress,
      gigsABI,
      signer,
    );

    const metadataJson = {
      title: formikValues.title,
      description: formikValues.description,
      image: user.imageUrl,
      props: {
        skills: user.skills,
        commitment: formikValues.commitment,
        credits: user.diToCredits
      }
    }
    console.log(metadataJson);

    const url = await pushJSONDocument(metadataJson);

    console.log(url);


    const credits = toWei(budget.toString(), 'ether');
    const gig = await contract.createGig(credits, url);
    console.log(gig);
    return gig;

  } catch (err) {
    console.log(err);
    return;
  }
}

export const takeGig = async (gigsAddress, gigID) => {
  console.log(gigsAddress);
  console.log(gigID);
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      gigsAddress,
      gigsABI,
      signer,
    );

    const takeTx = await contract.takeGig(gigID);
    console.log(takeTx);
    const takeTxnResult = await takeTx.wait();
    const { events } = takeTxnResult;
    const gigTakenEvent = events.find(
      e => e.event === 'GigTaken',
    );

    if (!gigTakenEvent) {
      throw new Error('Something went wrong');
    }
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}