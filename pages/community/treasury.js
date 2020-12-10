import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import { useMagic } from '../../components/Store';
import Layout from '../../components/Layout';
import CommunityTreasuryForm from '../../components/treasury/CommunityTreasuryForm';
import CheckupCard from '../../components/community/CheckupCard';

import NoGSNCommunityAbi from '../../utils/NoGSNCommunity.json';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useGetCommunityInfo } from '../../hooks/useGetCommunityInfo';

function CommunityTreasury() {
  const { data: userInfo } = useGetUserInfo();
  const magic = useMagic();

  const { data: communityInfo } = useGetCommunityInfo();
  const { register, handleSubmit, errors } = useForm();

  const [availableDAI, setAvailableDAI] = useState();
  const [stakingStage, setStakingStage] = useState(0);

  async function deposit(currency, amount) {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    try {
      const signer = provider.getSigner();
      const contractAddress = userInfo.communityContract.address;
      const contractABI = NoGSNCommunityAbi.abi;
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      );
      const depositTx = await contract.deposit(
        amount,
        currency,
        ethers.utils.id(''),
      );
      const receipt = await depositTx.wait();
      console.log(receipt);
      return;
    } catch (err) {
      console.error(err);
    }
  }

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const mockDAIAbi =
        '[{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]';
      const contractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108';
      const contract = new ethers.Contract(contractAddress, mockDAIAbi, signer);
      const bal = await contract.balanceOf(address);
      console.log(ethers.utils.formatUnits(bal, 18));
      setAvailableDAI(ethers.utils.formatUnits(bal, 18));
    } catch (err) {
      console.error(err);
    }
  }

  const approveStaking = async () => {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    const signer = provider.getSigner();
    const mockDAIAbi =
      '[{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]';
    const contractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108';
    const communityContractAddress = userInfo.communityContract.address;

    const contract = new ethers.Contract(contractAddress, mockDAIAbi, signer);
    const tx = await contract.approve(
      communityContractAddress,
      ethers.utils.parseUnits('10000', 18),
    );
    const receipt = await tx.wait();
  };

  const invest = async (currency, amount) => {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();
    const contractAddress = userInfo.communityContract.address;
    const contractABI = NoGSNCommunityAbi.abi;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const investTx = await contract.invest(amount, currency);
    const receipt = await investTx.wait();
  };

  const onSubmit = async data => {
    console.log(data);
    setStakingStage(1);
    await approveStaking();
    setStakingStage(2);
    await deposit(data.currency, Number(data.amount));
    setStakingStage(3);
    invest(data.currency, Number(data.amount));
    setStakingStage(4);
  };

  useEffect(() => {
    (async () => {
      await getBalance();
    })();
  }, []);

  // TODO: Loading
  if (!communityInfo) return 'Loading';

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center w-full z-0 ">
          <h1 className="mt-5 underline text-black text-center text-4xl">
            Community Treasury
          </h1>

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
