import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import { router, useRouter } from "next/router";

import ditoContractAbi from "../utils/ditoTokenContractAbi.json";
import communityContractAbi from "../utils/communityContractAbi.json";

function SkillWallet() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const [ditoBalance, setDitoBalance] = useState(-1);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

      try {
        const signer = provider.getSigner();

        // Get user's Ethereum public address
        const address = await signer.getAddress();

        const communityContractABI = communityContractAbi;
        const communityContractAddress =
          userInfo.communityContract.address ||
          "0x759A224E15B12357b4DB2d3aa20ef84aDAf28bE7";
        const communityContract = new ethers.Contract(
          communityContractAddress,
          communityContractABI,
          signer
        );

        const ditoContractABI = ditoContractAbi;
        const ditoContractAddress = await communityContract.tokens();
        const ditoContract = new ethers.Contract(
          ditoContractAddress,
          ditoContractABI,
          signer
        );

        // Send transaction to smart contract to update message and wait to finish
        const ditoBalance = await ditoContract.balanceOf(address);

        let ditoBalanceStr = BigNumber.from(ditoBalance).toString();
        ditoBalanceStr = ditoBalanceStr.slice(0, ditoBalanceStr.length - 18);

        setDitoBalance(ditoBalanceStr);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const router = useRouter();

  return (
   /*  <!--MAIN --> */
    <div className="w-full flex flex-col  space-y-8"> 
      {/* <!-- MAIN TITLE --> */}
      <div className="w-1/8  ml-5 my-4">
        <h1 className="underline text-black text-4xl">Skill Wallet</h1>
      </div> 
       
      <div className="w-full flex flex-row space-y-8">
      {/* <!-- WALLET CARD --> */}
        <div className="flex flex-col w-1/3 p-3 border border-blue-600 m-3">              
              <div className="flex flex-col">  
                {/* <!--PROFILE--> */}
                <div className="flex h-1/4 text-white bg-black rounded p-3 mb-3">
                  <div className="flex w-1/2 items-center justify-center">
                    <p className="text-4xl">👨</p>
                  </div>
                  <div className="flex flex-col w-1/2 items-left   justify-start">
                    <h3 className="font-bold">Nickname</h3>
                    <h3>nickname@example.com</h3>  
                  </div>
                </div>
               {/*  <!--COMMUNITIES--> */}
                <div className="h-1/4 flex px-3 py-4 mb-4 flex-col items-center justify-center border border-blue-600">
                  <h1 className="text-3xl font-bold ">My Community</h1>
                  <div className="bg-blue-600 py-3 w-1/2 text-white text-center">
                    <p>DITO #23</p>
                  </div>
                </div>
               {/*  <!--QR-CODE--> */}
                <div className="flex h-1/4 py-4 items-center justify-center border border-blue-600">
                  <p>Show <a href="#" className="underline text-blue-600"> Wallet's QR-Code</a> to help a different community.</p> 
                </div>
                {/*  <!--BALANCE--> */}
                 <div className="flex h-1/4 p-3 mb-3">
                  <div className="flex w-1/2 items-center justify-center">
                    <p className="text-xl"><span className="underline">Credits</span> you earned.</p>
                  </div>
                  <div className="flex flex-col w-1/2 p-3 items-center   justify-start">
                    <img src="dito-tokens.svg"/>
                    <h2 className="font-bold p-3">  
                    {ditoBalance === -1 ? "Loading dito balance..." : `${ditoBalance} DiTo`} DiTo 
                    </h2>  
                  </div>
                </div>
              </div>
        </div>
      {/* BADGES AND PAST GIGS */} 
    <div className="flex flex-col w-2/3 space-y-8">
       {/*  <!--BADGES --> */}
        <div className="flex flex-col">
          <h1 className="w-1/3 text-center text-black p-3 border border-blue-600 ">By Badges</h1>
         
          <div className="flex flex-row">
            <div className="flex flex-row justify-around p-3 w-2/3"> 
             {/*  <!--BADGE--> */}
              <div className="flex w-16 h-16 sm:text-xl md:text-2xl lg:text-5xl lg:w-32 lg:h-32">
                <div className="rounded-full bg-gray-500 m-2 w-full flex justify-center items-center">🏆 </div>
              </div>
              <div className="flex w-16 h-16 sm:text-xl md:text-2xl lg:text-5xl lg:w-32 lg:h-32">
                <div className="rounded-full bg-gray-500 m-2 w-full flex justify-center items-center">🏅 </div>
              </div>
              <div className="flex w-16 h-16 sm:text-xl md:text-2xl lg:text-5xl lg:h-32 lg:w-32 ">
                <div className="flex rounded-full items-center justify-center w-full bg-gray-500 m-2 flex justify-center items-center">👍</div>
              </div>
            </div>
            <div className="flex flex-row w-1/3">
              <div className="p-3 w-full"><p className="pr-4">Badges will appear here once you validate your skills. Check the <a className="text-blue-600 underline" href="#">Open Gigs</a> and validate your Skills now!
              </p> </div>
            </div> 
          </div>
        </div>

     {/*  <!--PAST GIGS --> */}
      <div className="flex flex-col m-3 ">
        <h1 className="w-1/3 text-center text-black p-3 border border-blue-600 ">Past Gigs</h1>
        <div className="flex flex-row flex-wrap justify-around py-3" >
          <div className="flex w-1/3 h-1/2">
            <div className="flex-row border border-blue-600 m-1 w-full flex justify-center items-center">
             {/*  <!--GIG--> */}
              <div className="flex flex-col h-full p-2 w-1/2">
                  <h3>Mockup gig #1</h3>
                  <p className="text-xs">Random description ...</p>
                  <h3>Skills Used</h3>
                   <ul className="text-xs">
                     <li>#House-holding</li>
                     <li>#Gardening</li>
                   </ul>
              </div>
              <div className="flex flex-col w-1/2 h-full p-2">
               <div className="flex flex-col h-1/2 h-full">
                  <h3 className="font-bold text-orange-500">Rate Received</h3>
                  <h3 className="text-black">7/10</h3>
                </div>
                <div className="flex flex-col h-1/2 h-full">
                  <h3 className="font-bold text-orange-500">Credits Received</h3>
                  <h3 className="text-black">6 Dito</h3>
                </div>
                
              </div>

            </div>
          </div>
          <div className="flex w-1/3 h-1/2">
            <div className="border border-blue-600 m-1 w-full flex justify-center items-center">gig </div>
          </div>
          <div className="flex w-1/3 h-1/2">
            <div className="border border-blue-600 m-1 w-full flex justify-center items-center">gig </div>
          </div>
         </div>    
      </div>
    </div>
  </div>
</div>  

  );
}

export default SkillWallet;