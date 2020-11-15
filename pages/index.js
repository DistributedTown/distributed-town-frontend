import SkillPill from "../components/SkillPill";
import Quote from "../components/Quote";
import RegistrationModal from "../components/registration/RegistrationModal";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import Store, {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  TokenContext,
  UserInfoContext
} from "../components/Store";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import TheNav from "../components/TheNav";
import bgImages from "../utils/bgImages.js";
import { get, set } from "mongoose";

import communityContractAbi from "../utils/communityContractAbi.json";

import { ethers } from "ethers";

const Index = props => {
  const [, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const router = useRouter();

  const authenticateWithDb = async DIDT => {
    /* Pass the Decentralized ID token in the Authorization header to the database */

    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + DIDT
      })
    });

    let data = await res.json();

    /* If the user is authorized, return an object containing the user properties (issuer, publicAddress, email) */
    /* Else, the login was not successful and return false */
    return data.authorized ? data.user : false;
  };

  const loginHandler = async event => {
    event.preventDefault();
    const { email: emailInput } = event.target;
    const email = emailInput.value;
    try {
      if (email.trim() === "") {
        throw new Error("Please enter a valid email address");
      }
      const DIDT = await magic.auth.loginWithMagicLink({ email });
      let user = await authenticateWithDb(DIDT);
      if (user) {
        setLoggedIn(user.email);
        // router.push("/skillwallet");
      } else {
        throw new Error("Something went wrong, please try again!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout
      flex
      bgImage={{ src: "/background-image.svg", alignment: "left", size: 60 }}
      className="h-screen w-full flex"
      logo={{ withText: true }}
      splash={{
        color: "blue",
        variant: "default",
        alignment: "left",
        isTranslucent: true
      }}
    >
      <div className="h-full w-3/5 flex justify-center items-center">
        <div className="p-8 bg-white flex justify-center items-center w-2/4 m-auto border border-black">
          <p className="text-center">
            <strong>Distributed Town</strong> is a new financial infrastructure
            for public goods, designed for the real world.
            <br />
            <br />
            It’s built upon mutual, collaborative economics between individuals
            and communities - and a universal identity management based on
            skills, rather than personal data.
          </p>
        </div>
      </div>
      <div className="h-full w-2/5 flex flex-col justify-center items-center">
        <h1 className="text-4xl m-12 font-bold">
          This is <span className="underline">your Community</span>
        </h1>

        <div className="pt-8 pb-4 px-2 border-2 border-denim flex flex-col w-3/5">
          <div className="border-2 border-red p-1">
            <div className="border-2 border-denim p-4 text-center font-bold">
              <Link href="/community/create">
                <a className="flex justify-around items-center text-xl px-8">
                  Create
                  <img src="/create-plus-button.svg" />
                </a>
              </Link>
            </div>
          </div>
          <div className="border-2 border-red p-1 mt-2">
            <div className="border-2 border-denim p-4 text-center font-bold">
              <Link href="/community/join">
                <a className="flex justify-around items-center text-xl px-8">
                  Join
                  <img src="/create-people-button.svg" />
                </a>
              </Link>
            </div>
          </div>
          <div className="border-2 border-red p-1 mt-8">
            <form
              className="border-2 border-denim p-4 flex justify-between items-center font-bold text-xl"
              onSubmit={loginHandler}
            >
              Login{" "}
              <input
                className="border border-denim p-1 w-3/4"
                placeholder="yourmail@me.io"
                name="email"
                type="email"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let skills = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill`, {
    method: "GET"
  });
  skills = await skills.json();

  return {
    props: { skills } // will be passed to the page component as props
  };
}

export default Index;
