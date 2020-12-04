import { useQuery } from 'react-query';
import { BigNumber, ethers } from 'ethers';
import { useContext } from 'react';
import ditoContractAbi from '../utils/ditoTokenContractAbi.json';
import communityContractAbi from '../utils/communityContractAbi.json';
import { MagicContext, UserInfoContext } from '../components/Store';

export const useGetDitoBalance = () => {
  const [userInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  return useQuery('ditoBalance', async () => {
    const signer = provider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

    const communityContractABI = communityContractAbi;
    const communityContractAddress =
      userInfo.communityContract.address ||
      '0x759A224E15B12357b4DB2d3aa20ef84aDAf28bE7';
    const communityContract = new ethers.Contract(
      communityContractAddress,
      communityContractABI,
      signer,
    );

    const ditoContractABI = ditoContractAbi;
    const ditoContractAddress = await communityContract.tokens();
    console.log(ditoContractAddress);
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
