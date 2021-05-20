import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import CommunityTreasuryForm from '../../components/treasury/CommunityTreasuryForm';
import CheckupCard from '../../components/community/CheckupCard';
import PageTitle from '../../components/PageTitle';

import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useGetCommunity } from '../../hooks/useGetCommunity';

function CommunityTreasury() {
  const { data: userInfo } = useGetUserInfo(3);;

  const { data: communityInfo } = useGetCommunity();
  const { register, handleSubmit, errors } = useForm();

  const [availableDAI, setAvailableDAI] = useState(0);
  const [stakingStage, setStakingStage] = useState(0);

  const invest = async (currency, amount) => {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const contractAddress = userInfo.communityContract.address;
    const contractABI = NoGSNCommunityAbi.abi;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const investTx = await contract.invest(amount, currency);
    const receipt = await investTx.wait();
  };

  const onSubmit = async data => {
    // console.log(data);
    // setStakingStage(1);
    // await approveStaking();
    // setStakingStage(2);
    // await deposit(data.currency, Number(data.amount));
    // setStakingStage(3);
    // invest(data.currency, Number(data.amount));
    // setStakingStage(4);
  };

  useEffect(() => {
    (async () => {
      // await getBalance();
    })();
  }, []);

  // TODO: Loading
  if (!communityInfo) return null;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="flex flex-col items-center w-full py-4">
          <PageTitle className="mt-5 text-black text-center text-4xl">
            Community Treasury
          </PageTitle>
          <CommunityTreasuryForm
            register={register}
            errors={errors}
            apy={communityInfo.liquidityPoolAPY}
            availableDAI={availableDAI}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            stakingStage={stakingStage}
          />
        </div>
        <CheckupCard />
      </div>
    </Layout>
  );
}

export default CommunityTreasury;
