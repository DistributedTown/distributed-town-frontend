import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext,
  TokenContext
} from "../components/Store";
import Layout from "../components/Layout";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import { router, useRouter } from "next/router";

import ditoContractAbi from "../utils/ditoTokenContractAbi.json";
import communityContractAbi from "../utils/communityContractAbi.json";
import { removeUserJourney, getUserJourney } from "../utils/userJourneyManager";

function SignupCompleted() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [token] = useContext(TokenContext);
  const [shareLink, setShareLink] = useState("");

  const [ditoBalance, setDitoBalance] = useState(-1);
  const [showInviteModal, setShowInviteModal] = useState(false);

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
        console.log(ditoContractAddress);
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
        setUserInfo({ ...userInfo, ditoBalance: ditoBalanceStr });
      } catch (err) {
        console.error(err);
      }
    })();
    // remove user journey
    return () => removeUserJourney();
  }, []);

  const router = useRouter();

  const { journey } = getUserJourney();

  const inviteMembers = async () => {
    try {
      if (!shareLink) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/invite`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        const link = await res.json();
        setShareLink(link.linkUrl);
      }
      setShowInviteModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = () => {
    const text = `Hey there! We've got some funds from DistributedTown,
    join my community - and let's work on something meaningful together! ${shareLink}`;
    navigator.clipboard.writeText(text).then(
      function() {
        console.log("Async: Copying to clipboard was successful!");
      },
      function(err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <Layout
      navBar
      logo
      splash={{
        color: "alizarin",
        variant: "quad",
        alignment: "left"
      }}
    >
      <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
        <div className="flex-1 text-center flex items-center flex-col">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <h2 className="text-4xl">You are now a member of DiTo!</h2>
          <p className="text-orange text-3xl mt-8">
            Here are your community credits
          </p>
          <div className="bg-red-600 rounded-full flex flex-col p-8 items-center justify-center h-64 w-64 mt-4">
            <img src="/dito-tokens.svg" />
            <p className="text-orange mt-4">
              {ditoBalance === -1
                ? "Loading dito balance..."
                : `${ditoBalance} DiTo`}
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center bottom-0 right-0 border-2 border-gray-400 py-4 px-48">
          {journey === "community" && (
            <button
              type="button"
              onClick={inviteMembers}
              className="border-2 border-rain-forest p-2 w-full text-3xl font-bold mr-8"
            >
              Invite new Members
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/skillwallet")}
            className="border-2 border-blue-600 p-2 w-full text-2xl font-bold"
          >
            Check your SkillWallet
          </button>
        </div>
      </div>
      {showInviteModal && (
        <div
          className="fixed inset-0 h-screen w-screen bg-opacity-50 bg-white flex justify-center items-center"
          onClick={() => setShowInviteModal(false)}
        >
          <div className="bg-white flex flex-col justify-center items-center border-2 border-black">
            <a
              target="_blank"
              href={encodeURI(`https://twitter.com/intent/tweet?text=Hey there! We've got some funds from DistributedTown,
join my community - and let's work on something meaningful together! ${shareLink}`)}
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
            >
              <img src="/twitter.png" className="mr-4 h-12" />
              Twitter
            </a>
            <a
              href={encodeURI(
                `https://www.facebook.com/sharer/sharer.php?href=`
              )}
              target="_blank"
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
              onClick={() => {
                const text = encodeURIComponent(
                  `Hey there! We've got some funds from DistributedTown, join my community - and let's work on something meaningful together!`
                );
                console.log(text);
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${text}`,
                  "facebook-share-dialog",
                  "width=626,height=436"
                );
              }}
            >
              <img src="/fb.png" className="mr-4 h-12" />
              Facebook
            </a>
            <a
              target="_blank"
              href={encodeURI(`https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=DiTo&summary=Hey there! We've got some funds from DistributedTown,
              join my community - and let's work on something meaningful together! ${shareLink}`)}
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
            >
              <img src="/linkedin.png" className="mr-4 h-12" />
              LinkedIn
            </a>
            <div
              onClick={copyLink}
              className="px-24 py-8 text-xl font-bold border-black border w-full flex items-center justify-between"
            >
              <img src="/copy.png" className="mr-4 h-12" />
              Copy link
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SignupCompleted;
