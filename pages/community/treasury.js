import {
    MagicContext,
    UserInfoContext,
} from "../../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";


import communityContractAbi from "../../utils/communityContractAbi.json";
import { Router, useRouter } from "next/router";
function CommunityTreasury() {
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const [magic] = useContext(MagicContext);

    const router = useRouter();

    const [isJoining, setIsJoining] = useState(false);

    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        (async () => {
            await getCommunityInfo();
        })();
    }, []);

    async function getCommunityInfo() {
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

        try {
            const signer = provider.getSigner();

            // Get user's Ethereum public address
            const address = await signer.getAddress();

            const contractABI = communityContractAbi;
            const contractAddress = "0x790697f595Aa4F9294566be0d262f71b44b5039c";
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            // Send transaction to smart contract to update message and wait to finish
            const [nUsers, investedBalance] = await Promise.all([
                contract.numberOfMembers(),
                contract.getInvestedBalance(),
            ]);

            setNumOfMembers(BigNumber.from(nUsers).toNumber());
            setLiquidityPoolBalance(BigNumber.from(investedBalance).toNumber());
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-full h-screen flex">
            <div className="flex flex-col items-center flex-grow space-y-8 px-8 py-4">
                <h1 className="underline text-black text-center text-4xl">Community Treasury</h1>
                <div className="flex flex-col  justify-center  w-3/4 space-y-4 border-2 border-denim px-8 py-5">

                    <h1 class="flex text-ceter font-bold underline justify-center">Add funds to Treasury</h1>

                    <div className="flex flex-row justify-center">
                        <div className="flex flex-col w-1/2 p-3">
                            <h2 className="font-bold underline text-center mb-3">Currency</h2>
                            <div className="flex flex-row justify-around ">
                                <div className="flex flex-row items-center " >
                                    <input type="checkbox" key={'DAI'} id="DAI" />
                                    <div className="flex flex-col font-bold pl-3">
                                        <p>DAI </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center" >
                                    <input type="checkbox" key={'USDC'} id="USDC" />
                                    <div className="flex flex-col font-bold pl-3">
                                        <p>USDC</p>
                                    </div>
                                </div>
                            </div>
                            <p class="text-left text-sm  text-dove-gray">
                                Stablecoins are not regular<br></br>
              crypto. They are "pegged" to <br></br>
              Fiat (USD), so they are not<br></br>
              volatile (they are stable):<br></br>
              1 DAI = 1 Dollar<br></br>
              1 USDC = 1 Dollar<br></br>
                            </p>
                        </div>

                        <div className="flex flex-col w-1/2 p-3">

                            <h2 className="font-bold underline text-center mb-3 ">Community APY</h2>
                            <div className="h-3 mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden">
                                <div className="w-full h-full bg-white absolute"></div>
                                <div id="bar" className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-24">
                                    24%
                </div>
                            </div>

                            <p className="text-sm text-dove-gray">
                                "Staking" is different from<br></br>
                "Donating" - basically your  <br></br>
                community is "looking" these<br></br>
                funds to provide liquidity. In<br></br>
                exchange, you all get a higher<br></br>
                interest return!<br></br>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center ">
                        <div className="flex flex-col w-1/2 p-3">
                            <h2 className="font-bold underline text-center mb-3">Amount</h2>
                            <input className="justify-center text-center border border-denim h-16" type="number" value={500} />
                            <p className="text-right text-sm">DAI/USDC</p>
                            <p className="text-left text-dove-gray text-sm">
                                The amount of tokens you
                                stake for your community
              </p>
                        </div>

                        <div className="flex flex-col w-1/2 p-3 space-y-2">
                            <h2 className="text-center font-bold underline"> Your return</h2>
                            <p className="text-left text-dove-gray">Your intial investment plus</p>
                            <div className="h-3 mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden">
                                <div className="w-full h-full bg-white absolute"></div>
                                <div id="bar" className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-16">
                                    $17.15
                </div>
                            </div>
                            <p className="text-left text-sm  text-dove-gray">
                                It is based on the size of your <br></br>
              staking, and the amount of DiTo  <br></br>
              you own!<br></br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-100 flex w-1/4 flex-grow justify-center  items-center">
                <div className="flex flex-col border-2 border-denim ">
                    <div className="bg-denim p-4 text-center font-bold">
                        {/* <h2>{userInfo.communityContract.name}</h2> */}
                        <h2 className="text-3xl">DiTo #23</h2>
                        <p>Check-up Card</p>
                    </div>
                    <div className="flex flex-col justify-center bg-white p-4 space-y-4">
                        <div className="flex flex-row intems-center justify-end space-x-3">
                            <p className="flex pt-2 font-bold justify-start underline">Members</p>
                            <div className="flex rounded-full h-10 w-10 flex border-2 border-denim items-center justify-center">7</div>
                        </div>
                        <div className="flex flex-row intems-center justify-end space-x-3">
                            <p className="flex pt-2 font-bold justify-start text-left underline">Open Proposals</p>
                            <div className="flex rounded-full h-10 w-10 flex border-2 border-ripe-lemon items-center justify-center">4</div>
                        </div>
                        <div className="flex flex-row intems-center justify-end space-x-3">
                            <div className="flex font-bold pt-2 justify-start  text-left underline">Liquidity Pool</div>
                            <div className="flex rounded-full h-10 w-10 flex border-2 border-alizarin items-center justify-center">
                                3k
                </div>
                        </div>
                        <div className="flex flex-col border-2  justify-center border-blue-600 p-4">
                            <p className="font-bold underline text-center ">Scarcity score</p>
                            <p className="text-christi text-center">72</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityTreasury;
