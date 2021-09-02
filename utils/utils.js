import { BN } from 'bn.js';
import { ethers } from 'ethers';
import { toWei } from 'web3-utils';
import gigsABI from './gigsABI.json';
import { pushJSONDocument } from './textile.hub';

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

          
        //   const budg = (budget * (10 ** 18)).toString();
        const budg = budget.toString();
          console.log(budg, typeof budg, toWei(budg, 'ether'));
        const gig = await contract.createGig(toWei(budg, 'ether'), url);
        // const gig = await contract.createGig(budget, url);
          console.log(gig);
        return gig;

    } catch (err) {
        console.log(err);
        return;
      }
}