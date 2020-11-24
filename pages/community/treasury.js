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
    // const [userInfo, setUserInfo] = useContext(UserInfoContext);
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
    }, []);

    async function deposit(currency, amount) {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);


        try {
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            // const contractAddress = userInfo.communityContract.address;
            const contractAddress = '0xe21A399D47B630eF41Bd3e7874CbA468DDFd38f9'
            const contractABI = NoGSNCommunityAbi.abi;
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                provider
            );

            // const daiToken = new ethers.Contract(DAI_ADDRESS, ERC20TransferABI, provider)

            // console.log('the address', address)

            // const bal = await daiToken.balanceOf(address)
            // console.log('bal', bal)


            const currencies = await contract.depositableCurrencies.length

            console.log(currencies)


            const contractWithSigner = contract.connect(signer)

            const dai = ethers.utils.parseUnits("1.0", 18);
            console.log('thedai', dai)
            console.log(ethers.utils.id("USDC"))
            depositTx = contractWithSigner.deposit(dai, "DAI", ethers.utils.id(""))
            // console.log(depositTx)
        } catch (err) {
            console.error(err);
        }


    }

    async function getCommunityInfo() {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        try {
            const signer = provider.getSigner();

            // Get user's Ethereum public address
            const address = await signer.getAddress();
            // console.log(userInfo)
            const contractAddress = '0x1347dBB8803aFa04Abe7D3a736A006502Bee2438'
            // const contractAddress = userInfo.communityContract.address;
            const contractABI = NoGSNCommunityAbi.abi;
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                provider
            );

            // Send transaction to smart contract to update message and wait to finish
            const [nUsers, investedBalanceInfo] = await Promise.all([
                contract.numberOfMembers(),
                contract.getInvestedBalanceInfo()
            ]);

            // const nUsers = await contract.numberOfMembers();
            // console.log(BigNumber.from(nUsers).toNumber())

            // const investedBalanceInfo = await contract.getInvestedBalanceInfo()
            // console.log(investedBalanceInfo)

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

            // console.log(
            //     BigNumber.from(nUsers).toNumber(),
            //     BigNumber.from(investedBalanceInfo.investedBalance).toNumber(),
            //     investedTokenAPY
            // );
            console.log(BigNumber.from(nUsers).toNumber(), '1')
            console.log(BigNumber.from(investedBalanceInfo.investedBalance).toNumber(), '2')
            console.log(investedTokenAPY, '3')

            setLiquidityPoolAPY(investedTokenAPY)

            setNumOfMembers(BigNumber.from(nUsers).toNumber());
            setLiquidityPoolBalance(
                BigNumber.from(investedBalanceInfo.investedBalance).toNumber()
            );
        } catch (err) {
            console.error(err);
        }
    }
    const onSubmit = (data) => {
        if (data["DAI"] === false && data["USDC"] === false) {
            setError("currency", { type: "manual", message: "You need to pick one currency to stake" })
            return;
        }
        if (data["DAI"] === true && data["USDC"] === true) {
            setError("currency", { type: "manual", message: "You can only pick one currency to stake" })
            return;
        }
        console.log(data)
        deposit('DAI', 1)
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
                            <CommunityTreasuryForm register={register} errors={errors} clearErrors={clearErrors} apy={liquidityPoolAPY} />
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
