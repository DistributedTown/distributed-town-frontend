import { BigNumber, ethers } from 'ethers';
import { useQuery } from 'react-query';
import NoGSNCommunityAbi from '../utils/NoGSNCommunity.json';
import { getCommunityById } from '../api/communities';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetCommunity = () => {
  const { data: userInfo } = useGetUserInfo();

  return useQuery(
    'communityInfo',
    async function getCommunityInfo() {
      const communityInfo = await getCommunityById(
        userInfo.communityID,
      );
      const communityAddress = communityInfo.addresses.find(
        a => a.blockchain === 'ETH',
      ).address;
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);

      const contractAddress = communityAddress;
      const contractABI = NoGSNCommunityAbi.abi;
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      );

      // Send transaction to smart contract to update message and wait to finish
      const [nUsers, investedBalanceInfo] = await Promise.all([
        contract.numberOfMembers(),
        contract.getInvestedBalanceInfo(),
      ]);

      let investedTokenAPY = BigNumber.from(
        investedBalanceInfo.investedTokenAPY,
      ).toString();
      // 26 because uint256 returned from Aave are Rays which are decimals written as 27 digits long integers
      investedTokenAPY = Number(
        `${investedTokenAPY.substring(
          0,
          investedTokenAPY.length - 26,
        )}.${investedTokenAPY.substring(investedTokenAPY.length - 26)}`,
      );

      const numberOfMembers = BigNumber.from(nUsers).toNumber();
      const liquidityPoolBalance =
        Math.round(
          (Number(
            ethers.utils.formatUnits(investedBalanceInfo.investedBalance, 18),
          ) +
            Number.EPSILON) *
            100,
        ) / 100;

      return {
        communityInfo,
        communityAddress,
        numberOfMembers,
        liquidityPoolBalance,
        liquidityPoolAPY: investedTokenAPY,
      };
    },
    { enabled: !!userInfo },
  );
};
