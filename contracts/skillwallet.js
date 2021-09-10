import skillWalletAbi from './abis/skillWalletAbi.json';
import { getSkillWalletAddress } from './community';
import { ethers } from 'ethers';

export const claim = async (
    communityAddress
) => {
    try {
        console.log('claim func');
        const provider = new ethers.providers.Web3Provider(web3.currentProvider);
        const signer = provider.getSigner();

        const skillWalletAddress = await getSkillWalletAddress(communityAddress);

        console.log('skillWalletAddress', skillWalletAddress);
        const contract = new ethers.Contract(
            skillWalletAddress,
            skillWalletAbi,
            signer,
        );
        const claimTx = await contract.claim();
        console.log(claimTx);
        const claimTransactionResult = await claimTx.wait();
        console.log(claimTransactionResult);
        const { events } = claimTransactionResult;
        const claimedEvent = events.find(
            e => e.event === 'SkillWalletClaimed',
        );

        if (!claimedEvent) {
            throw new Error('Something went wrong');
        }
        console.log('claimed');


    } catch (err) {
        console.log(err);
        return;
    }
};