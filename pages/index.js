import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { FaPlus, FaUsers } from 'react-icons/fa';
import LogoWithBlob from '../components/LogoWithBlob';
import Button from '../components/Button';
import Card from '../components/Card';
import { useEffect } from 'react';
import { defineCustomElements } from "@skill-wallet/auth/loader";

const Index = () => {
  // TODO: Loading while logging in to API after magic link
  const router = useRouter();

  useEffect(() => {
    defineCustomElements(window);
    window.addEventListener('onSkillwalletLogin', () => {
      onSkillWalletLogin();
    });
  }, []);
    
  const onSkillWalletLogin = async () => {
    try {
      router.push('/community');
      return;
    } catch (e) {
      router.push('/')
    }
  }

  return (
    <>
      <div className=" h-16 absolute z-10 w-full flex justify-end">
        <skillwallet-auth 
            id="walletButton" 
            className="flex items-center justify-center space-x-4 text-l" 
          ></skillwallet-auth>
      </div>
      <div className="flex flex-col items-center flex-1 mx-auto lg:flex-row lg:min-h-screen">
        <Head>
          <title>Distributed Town</title>
        </Head>
        <Info className="relative grid content-center w-full info lg:w-3/5 lg:h-full " />
        <div className="flex flex-col items-center justify-center h-full lg:w-2/5">
          <h1 className="m-8 text-4xl font-bold text-center">
            This is <span className="underline">your Community</span>
          </h1>
          <div className="flex flex-col p-4 mx-0 mb-4 space-y-4 sm:mx-8 sm:p-8">
            <Link href="/community/create"  as="/community/create">
              <Button disabled={true} className="w-96 mt-8 mb-4 h-16 rounded-full">
                <a className="flex items-center justify-center space-x-4 text-xl">
                  <span>Create</span>
                  <FaPlus />
                </a>
              </Button>
            </Link>

            <Link href="/community/join" as="/community/join">
              <Button id="joinButton" className="h-16 rounded-full">
                <a className="flex items-center justify-center space-x-4 text-xl">
                  <span>Join</span>
                  <FaUsers />
                </a>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

function Info({ className }) {
  return (
    <div className={className}>
      <LogoWithBlob />
      <Card className="relative grid gap-8 mx-4 mb-4 p-10 bg-gray-100 text-center lg:w-7/12 lg:justify-self-center lg:align-self-center border-2">
        <p className="text-xl text-left">
          <strong>Distributed Town</strong> is a new financial infrastructure
          for public goods, designed for the real world.
        </p>
        <p className="text-gray-700 text-left">
          It’s built upon mutual, collaborative economics between individuals
          and communities - and a universal identity management based on skills,
          rather than personal data.
        </p>
      </Card>
      <style jsx>{`
        .info {
          background-image: url('/background-image.svg');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
}

export default Index;