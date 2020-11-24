import { MagicContext, UserInfoContext } from "../../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import { useForm } from "react-hook-form";


import Layout from "../../components/Layout";
import CommunityTreasuryForm from "../../components/treasury/CommunityTreasuryForm"
import CheckupCard from "../../components/community/CheckupCard"

import communityContractAbi from "../../utils/communityContractAbi.json";
import NoGSNCommunityAbi from "../../utils/NoGSNCommunity.json";

// import { Magic } from "magic-sdk";


import { Router, useRouter } from "next/router";
function CommunityTreasury() {
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const [magic] = useContext(MagicContext);
    // const [magic, setMagic] = useState()

    const router = useRouter();
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();

    const [communities, setCommunities] = useState([]);
    const [isJoining, setIsJoining] = useState(false);
    const [numOfMembers, setNumOfMembers] = useState(0);
    const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(0);
    const [liquidityPoolAPY, setLiquidityPoolAPY] = useState(0);
    const [amountToInvest, setAmountToInvest] = useState(0);
    const [availableDAI, setAvailableDAI] = useState()




    // useEffect(() => {
    //     /* We initialize Magic in `useEffect` so it has access to the global `window` object inside the browser */
    //     let m = new Magic("pk_test_1C5A2BC69B7C18E5", {
    //         network: "ropsten",
    //         chainId: 8888 // Your own node's chainId
    //     });
    //     setMagic(m);
    // }, []);

    useEffect(() => {
        (async () => {
            await getCommunityInfo();
        })();
        (async () => {
            await getBalance();
        })();
    }, []);

    async function deposit(currency, amount) {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        try {
            const signer = provider.getSigner();
            const contractAddress = userInfo.communityContract.address;
            const contractABI = NoGSNCommunityAbi.abi;
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            const depositTx = await contract.deposit(amount, currency, ethers.utils.id(""))
            const receipt = await depositTx.wait();
            console.log(receipt)
            return;
        } catch (err) {
            console.error(err);
        }
    }

    async function getCommunityInfo() {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        try {
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log('myaddress', address)
            const contractAddress = userInfo.communityContract.address;
            const contractABI = NoGSNCommunityAbi.abi;
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                provider
            );

            const currencies = await contract.depositableCurrencies.length

            console.log('currencies', currencies)


            // Send transaction to smart contract to update message and wait to finish
            const [nUsers, investedBalanceInfo] = await Promise.all([
                contract.numberOfMembers(),
                contract.getInvestedBalanceInfo()
            ]);

            let investedTokenAPY = BigNumber.from(
                investedBalanceInfo.investedTokenAPY
            ).toString();

            // 26 because uint256 returned from Aave are Rays which are decimals written as 27 digits long integers
            investedTokenAPY = Number(
                `${investedTokenAPY.substring(
                    0,
                    investedTokenAPY.length - 26
                )}.${investedTokenAPY.substring(investedTokenAPY.length - 26)}`
            );

            console.log(BigNumber.from(nUsers).toNumber(), '1')
            console.log(ethers.utils.formatUnits(investedBalanceInfo.investedBalance, 18), '2')
            console.log(investedTokenAPY, '3')

            setLiquidityPoolAPY(investedTokenAPY)
            setNumOfMembers(BigNumber.from(nUsers).toNumber());
            setLiquidityPoolBalance(
                Math.round((Number(ethers.utils.formatUnits(investedBalanceInfo.investedBalance, 18)) + Number.EPSILON) * 100) / 100
            );
        } catch (err) {
            console.error(err);
        }
    }

    const getBalance = async () => {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        try {
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const mockDAIAbi = '[{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]'
            const contractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
            const contract = new ethers.Contract(
                contractAddress,
                mockDAIAbi,
                signer
            )
            const bal = await contract.balanceOf(address)
            console.log(ethers.utils.formatUnits(bal, 18))
            setAvailableDAI(ethers.utils.formatUnits(bal, 18))
        } catch (err) {
            console.error(err);
        }
    }

    const approveStaking = async () => {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        try {
            const signer = provider.getSigner();
            const mockDAIAbi = '[{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]'
            const contractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
            const communityContractAddress = userInfo.communityContract.address;

            const contract = new ethers.Contract(
                contractAddress,
                mockDAIAbi,
                signer
            )
            const tx = await contract.approve(communityContractAddress, ethers.utils.parseUnits("10000", 18));
            const receipt = await tx.wait();
            console.log(receipt)
            return
        } catch (err) {
            console.error(err);
        }
    }

    const invest = async (currency, amount) => {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

        try {
            const signer = provider.getSigner();
            const contractAddress = userInfo.communityContract.address;
            const contractABI = NoGSNCommunityAbi.abi;
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            const investTx = await contract.invest(amount, currency);
            const receipt = await investTx.wait();
            console.log(receipt)
            if (receipt) console.log('invested')
        } catch (err) {
            console.error(err);
        }
    }

    const onSubmit = async (data) => {
        if (data["DAI"] === false && data["USDC"] === false) {
            setError("currency", { type: "manual", message: "You need to pick one currency to stake" })
            return;
        }
        if (data["DAI"] === true && data["USDC"] === true) {
            setError("currency", { type: "manual", message: "You can only pick one currency to stake" })
            return;
        }
        console.log(data)
        for (const property in data) {
            if (data[property] === true) {
                await approveStaking()
                await deposit(property, Number(data.amount))
                invest(property, Number(data.amount))
            }
        }

    }

    return (
        <Layout
            navBar
            flex
            logo
            splash={{
                color: "blue",
                variant: "default",
                alignment: "left",
                isTranslucent: false,
                fullHeight: false
            }}
        >
            <div className="w-full">
                <div className="flex flex-col lg:flex-row z-0 h-screen">
                    <div className="flex flex-col items-center w-full z-0 h-full lg:overflow-scroll">
                        <h1 className="mt-5 underline text-black text-center text-4xl">
                            Community Treasury
                        </h1>
                        <form className="z-0 lg:mb-20">
                            <CommunityTreasuryForm register={register} errors={errors} clearErrors={clearErrors} apy={liquidityPoolAPY} availableDAI={availableDAI} />
                        </form>
                    </div>
                    <CheckupCard numOfMembers={numOfMembers} liquidityPoolBalance={liquidityPoolBalance} />
                </div>
                <div className="fixed flex bottom-0 border-t-2 justify-center border-gray-600 bg-white z-10 w-11/12">
                    <button type="button" onClick={handleSubmit(onSubmit)} className="px-32 border-2 mt-3 mb-3 border-blue-600 text-2xl underline">Stake and fund your community!</button>
                </div>
            </div>

        </Layout>
    );
}

export default CommunityTreasury;
