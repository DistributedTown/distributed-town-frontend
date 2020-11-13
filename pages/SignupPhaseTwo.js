import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  UserInfoContext,
  TokenContext
} from "../components/Store";

import { useContext, useEffect, useState } from "react";
import CommunityCard from "../components/CommunityCard";

import communityContractAbi from "../utils/communityContractAbi.json";

import { ethers } from "ethers";
import { useRouter } from "next/router";

function SignupPhaseTwo() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [token, setToken] = useContext(TokenContext);
  const [magic] = useContext(MagicContext);

  const router = useRouter();

  const [isJoining, setIsJoining] = useState(false);

  const [communities, setCommunities] = useState([]);

  async function joinCommunity() {
    setIsJoining(true);

    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      let community = communities.filter(community => community.selected)[0];

      const contractABI = communityContractAbi;
      console.log(community);
      const contractAddress =
        community.address || "0x790697f595Aa4F9294566be0d262f71b44b5039c";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setUserInfo({
        ...userInfo,
        communityContract: {
          _id: community._id,
          address: contractAddress,
          name: community.name
        }
      });

      let amountOfRedeemableDitos = 0;
      for (let { redeemableDitos } of userInfo.skills) {
        amountOfRedeemableDitos += redeemableDitos;
      }

      console.log(amountOfRedeemableDitos);

      // Send transaction to smart contract to update message and wait to finish
      const baseDitos = 2000;
      const totalDitos = amountOfRedeemableDitos + baseDitos;
      const tx = await contract.join(totalDitos);

      // Wait for transaction to finish
      const receipt = await tx.wait();

      await updateUser(community);
    } catch (err) {
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  }

  async function updateUser(community) {
    try {
      let currentToken = token;
      console.log("1 ct", currentToken);
      const responseFetchToken = await magic.user.getIdToken();
      const didToken = await responseFetchToken;
      if (token !== didToken) {
        currentToken = didToken;
        setToken(didToken);
      }

      console.log("2 ct", currentToken);

      console.log("updated skills userinfo", userInfo);

      const payload = {
        username: userInfo.username,
        communityID: community._id,
        skills: userInfo.skills
      };

      console.log("payload", payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: new Headers({
            Authorization: "Bearer " + currentToken,
            "Content-Type": "application/json"
          })
        }
      );

      const updatedUser = await response.json();
      console.log(await updateUser);

      router.push("/SignupCompleted");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let communitiesToAdd = [];
        for await (let { skill } of userInfo.skills) {
          let communities = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/community?skill=${skill}`,
            {
              method: "GET"
            }
          );
          communities = await communities.json();

          communities.map(community => {
            return { ...community, selected: false };
          });

          communitiesToAdd.push(...communities);
        }

        setCommunities(communitiesToAdd);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  function selectCommunity(commIndex) {
    setCommunities(communities =>
      communities.map((community, i) => {
        return { ...community, selected: i === commIndex };
      })
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-8 container mx-auto bg-blue-100 p-8 h-screen overflow-y-auto">
          <h1>Here's a few communities for you!</h1>
          {communities.map((community, i) => (
            <CommunityCard
              key={i}
              {...community}
              selectCommunity={() => selectCommunity(i)}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between space-y-8 w-full flex-grow p-8 h-screen">
          <h1>The credit you will earn with your skills</h1>
          <p>
            Your skills are your main asset. And the only thing that matters.
            The more rare they are, the more credits you’ll get!
          </p>
          <div className="border-2 border-blue-600 p-4 flex flex-col space-y-4">
            {userInfo.skills.map((skill, i) => {
              return (
                <div key={i} className="grid grid-cols-2">
                  <div className="flex flex-col">
                    <p>{skill.skill}</p>
                    <p>{skill.level.toString().padEnd(2, "0")}%</p>
                  </div>
                  <div className="flex space-x-2">
                    <img src="/dito-tokens.svg" />
                    <p>{skill.redeemableDitos} DiTo</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full border-2 border-gray-400">
            <button type="button" onClick={joinCommunity}>
              {isJoining
                ? "Joining the community, please wait"
                : "Join and get your credits!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPhaseTwo;
