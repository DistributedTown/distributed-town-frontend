import { useQuery } from 'react-query';
import { BigNumber, ethers } from 'ethers';
import { useContext } from 'react';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';
import communityContractAbi from '../utils/communityContractAbi.json';
import { MagicContext } from '../components/Store';
import { getCommunityById, getUserInfo } from '../api';

export const useGetDitoBalance = () => {
  const [magic] = useContext(MagicContext);
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  return useQuery('ditoBalance', async () => {
    const signer = provider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

    const communityContractABI = communityContractAbi;

    // TODO: useUserInfo to avoid making the same call many times
    const didToken = await magic.user.getIdToken();
    const userInfo = await getUserInfo(didToken);
    const community = await getCommunityById(didToken, userInfo.communityID);

    const communityContractAddress =
      community.addresses.find(a => a.blockchain === 'ETH').address ||
      '0x759A224E15B12357b4DB2d3aa20ef84aDAf28bE7';
    const communityContract = new ethers.Contract(
      communityContractAddress,
      communityContractABI,
      signer,
    );

    const ditoContractABI = ditoContractAbi;
    const ditoContractAddress = await communityContract.tokens();

    const ditoContract = new ethers.Contract(
      ditoContractAddress,
      ditoContractABI,
      signer,
    );

    // Send transaction to smart contract to update message and wait to finish
    const ditoBalance = await ditoContract.balanceOf(address);

    let ditoBalanceStr = BigNumber.from(ditoBalance).toString();
    ditoBalanceStr = ditoBalanceStr.slice(0, ditoBalanceStr.length - 18);

    return ditoBalanceStr;
  });
};
