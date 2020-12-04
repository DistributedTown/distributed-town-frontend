import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useMutation } from 'react-query';
import {
  MagicContext,
  UserInfoContext,
  TokenContext,
} from '../components/Store';
import contractABI from '../utils/communityContractAbi.json';

export const useJoinCommunity = () => {
  const router = useRouter();
  const [userInfo = { skills: [] }] = useContext(UserInfoContext);
  const [magic] = useContext(MagicContext);
  const [token, setToken] = useContext(TokenContext);

  async function joinCommunity() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();
      console.log(userInfo);
      const contractAddress = userInfo.communityContract
        ? userInfo.communityContract.address
        : '0x790697f595Aa4F9294566be0d262f71b44b5039c';
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      );

      let amountOfRedeemableDitos = 0;
      for (const { redeemableDitos } of userInfo.skills) {
        amountOfRedeemableDitos += redeemableDitos;
      }

      // Send transaction to smart contract to update message and wait to finish
      const baseDitos = 2000;
      const totalDitos = amountOfRedeemableDitos + baseDitos;
      const tx = await contract.join(totalDitos);

      // Wait for transaction to finish
      const receipt = await tx.wait();

      await updateUser(userInfo.communitContract);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  async function updateUser(community) {
    try {
      let currentToken = token;
      console.log('1 ct', currentToken);
      const responseFetchToken = await magic.user.getIdToken();
      const didToken = await responseFetchToken;
      if (token !== didToken) {
        currentToken = didToken;
        setToken(didToken);
      }

      console.log('2 ct', currentToken);

      console.log('updated skills userinfo', userInfo);

      const payload = {
        username: userInfo.username,
        communityID: community._id,
        skills: userInfo.skills,
      };

      console.log('payload', payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: new Headers({
            Authorization: `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          }),
        },
      );

      const updatedUser = await response.json();

      router.push('/signup/completed');
    } catch (err) {
      console.log(err);
    }
  }

  return useMutation(joinCommunity);
};
