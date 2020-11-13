import { MagicContext, UserInfoContext } from "../../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import Layout from "../../components/Layout";
import communityContractAbi from "../../utils/communityContractAbi.json";
import { Router, useRouter } from "next/router";
function CommunityTreasury() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  console.log(userInfo);
  const router = useRouter();

  const [isJoining, setIsJoining] = useState(false);
  const [currency, setCurrency] = useState("DAI");
  const [amount, setAmount] = useState(500);
  const [numberOfMembers, setNumOfMembers] = useState(0);
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(0);

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
      const contractAddress =
        userInfo.communityContract && userInfo.communityContract.address
          ? userInfo.communityContract.address
          : "0x790697f595Aa4F9294566be0d262f71b44b5039c";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Send transaction to smart contract to update message and wait to finish
      const [nUsers, investedBalance] = await Promise.all([
        contract.numberOfMembers(),
        contract.getInvestedBalance()
      ]);

      console.log(
        BigNumber.from(nUsers).toNumber(),
        BigNumber.from(investedBalance).toNumber()
      );

      setNumOfMembers(BigNumber.from(nUsers).toNumber());
      setLiquidityPoolBalance(BigNumber.from(investedBalance).toNumber());
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex w-full border-b-2 border-gray-600">
        <div className="flex flex-col justify-center items-center flex-grow w-7/12">
          <h1 className="underline text-black text-center text-4xl mb-8">
            Community Treasury
          </h1>
          <div className="flex flex-col  justify-center  w-3/4 space-y-4 border-2 border-denim px-8 py-5">
            <h1 class="flex text-ceter font-bold justify-center text-2xl">
              Add funds to Treasury
            </h1>

            <div className="flex flex-row justify-center">
              <div className="flex flex-col w-1/2 p-3">
                <h2 className="font-bold text-center mb-3 text-xl">Currency</h2>
                <div className="flex flex-row justify-around ">
                  <div className="flex flex-row items-center ">
                    <input
                      type="radio"
                      name="currency"
                      key={"DAI"}
                      id="DAI"
                      value="DAI"
                      checked={currency === "DAI"}
                      className="appearance-none"
                      onChange={e => setCurrency(e.target.value)}
                    />
                    <label
                      className="flex font-bold pl-3 items-center"
                      htmlFor="DAI"
                    >
                      <div className="border-black border-2 h-5 w-5 p-radio rounded-full mr-2">
                        {currency === "DAI" && (
                          <div className="bg-black rounded-full w-full h-full" />
                        )}
                      </div>
                      <p> DAI</p>
                    </label>
                  </div>
                  <div className="flex flex-row items-center">
                    <input
                      type="radio"
                      name="currency"
                      key={"USDC"}
                      id="USDC"
                      value="USDC"
                      checked={currency === "USDC"}
                      className="appearance-none"
                      onChange={e => setCurrency(e.target.value)}
                    />
                    <label
                      className="flex font-bold pl-3 radio-label items-center"
                      htmlFor="USDC"
                    >
                      <div className="border-black border-2 h-5 w-5 p-radio rounded-full  mr-2">
                        {currency === "USDC" && (
                          <div className="bg-black rounded-full w-full h-full" />
                        )}
                      </div>
                      <p> USDC</p>
                    </label>
                  </div>
                </div>
                <p class="text-left text-sm mt-2 text-dove-gray">
                  Stablecoins are not regular crypto. They are "pegged" to Fiat
                  (USD), so they are not volatile (they are stable):
                  <br />1 DAI = 1 Dollar <br />1 USDC = 1 Dollar
                </p>
              </div>

              <div className="flex flex-col w-1/2 p-3">
                <h2 className="font-bold text-xl text-center mb-3">
                  Community APY
                </h2>
                <div className="h-3 mb-3 relative max-w-xl rounded-xl h-8 border-2 border-denim overflow-hidden">
                  <div className="w-full h-full bg-white absolute"></div>
                  <div
                    id="bar"
                    className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-24 rounded-r-lg"
                  >
                    24%
                  </div>
                </div>

                <p className="text-sm text-dove-gray">
                  "Staking" is different from<br></br>
                  "Donating" - basically your <br></br>
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
                <input
                  className="justify-center text-center border border-denim h-16 font-bold"
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <p className="text-right text-sm">DAI/USDC</p>
                <p className="text-left text-dove-gray text-sm">
                  The amount of tokens you stake for your community
                </p>
              </div>

              <div className="flex flex-col w-1/2 p-3 space-y-2">
                <h2 className="text-center font-bold underline">
                  {" "}
                  Your return
                </h2>
                <p className="text-left text-dove-gray">
                  Your intial investment plus:
                </p>
                <div className="h-3 mb-3 relative max-w-xl rounded-xl h-8 border-2 border-denim overflow-hidden">
                  <div className="w-full h-full bg-white absolute"></div>
                  <div
                    id="bar"
                    className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-16 rounded-r-lg"
                  >
                    $17.15
                  </div>
                </div>
                <p className="text-left text-sm  text-dove-gray">
                  It is based on the size of your <br></br>
                  staking, and the amount of DiTo <br></br>
                  you own!<br></br>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 flex flex-grow justify-center items-center w-5/12 py-32 px-24">
          <div className="flex flex-col border-2 border-denim w-full h-full">
            <div className="bg-denim p-4 text-center font-bold">
              {/* <h2>{userInfo.communityContract.name}</h2> */}
              <h2 className="text-3xl">DiTo #23</h2>
              <p>Check-up Card</p>
            </div>
            <div className="flex flex-col justify-center bg-white p-4 space-y-12 flex-1">
              <div className="flex flex-row items-center justify-center">
                <p className="font-bold underline flex-1 text-center text-2xl">
                  Members
                </p>
                <div className="flex rounded-full h-16 w-16 font-bold text-xl flex border-2 border-denim items-center justify-center">
                  {numberOfMembers}
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <p className="font-bold underline flex-1 text-center text-2xl">
                  Open Proposals
                </p>
                <div className="flex rounded-full h-16 w-16 font-bold text-xl flex border-2 border-ripe-lemon items-center justify-center font-bold">
                  4
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <p className="font-bold underline flex-1 text-center text-2xl">
                  Liquidity Pool
                </p>
                <div className="flex rounded-full h-16 w-16 font-bold text-xl flex border-2 border-alizarin items-center justify-center">
                  {liquidityPoolBalance}
                </div>
              </div>
              <div className="flex flex-col border-4  justify-center border-blue-600 p-4 text-2xl">
                <p className="font-bold underline text-center ">
                  Scarcity score
                </p>
                <p className="text-christi text-center">72</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">
        <button className="px-32 py-2 border-denim border-2 font-bold text-xl underline">
          Stake and Fund your community!
        </button>
      </div>
    </div>
  );
}

export default CommunityTreasury;
