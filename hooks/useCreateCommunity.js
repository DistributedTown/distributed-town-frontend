import { useContext } from 'react';
import { ethers } from 'ethers';
import { useMutation } from 'react-query';
import communitiesABI from '../utils/communitiesRegistryAbi.json';
import { MagicContext } from '../components/Store';
import contractABI from '../utils/communityContractAbi.json';
import { createCommunity } from '../api';

export const useCreateCommunity = () => {
  const [magic] = useContext(MagicContext);

  return useMutation(
    async ({ name, category, user }) => {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      // TODO: Create contract should join the user automatically instead of needing to call join after that.
      // call the smart contract to create community
      const contract = new ethers.Contract(
        '0xe141f6C659bEA31d39cD043539E426D53bF3D7d8',
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

      // FIXME: Security concern
      // TODO: This should be calculated and done in the backend
      const didToken = await magic.user.getIdToken();
      let amountOfRedeemableDitos = 0;
      for (const { redeemableDitos } of user.skills || []) {
        amountOfRedeemableDitos += redeemableDitos || 0;
      }
      const baseDitos = 2000;
      const totalDitos = amountOfRedeemableDitos + baseDitos;

      const communityContract = new ethers.Contract(
        communityAddress,
        contractABI,
        signer,
      );
      const joinTx = await communityContract.join(totalDitos);
      // Wait for transaction to finish
      await joinTx.wait();

      // call api to create community and user
      const community = {
        address: communityCreatedEvent.args[0],
        name,
        category,
      };
      await createCommunity(didToken, community, user);
    },
    { throwOnError: true },
  );
};
