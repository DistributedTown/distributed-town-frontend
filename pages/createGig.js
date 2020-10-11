import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";

import { router, useRouter } from "next/router";

import ditoContractAbi from "../utils/ditoTokenContractAbi.json";

function CreateGig() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const [openGigs, setOpenGigs] = useState([]);

  const router = useRouter();

  return (
    <div className="w-full h-screen p-8">
      <h1>Create New Gig</h1>
      <form className="border-l-2 border-blue-600 flex flex-col pl-4">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <label htmlFor="gigTitle">Gig title</label>
            <p>
              Hint: a short, clear title will catch contributors’ attention.
              Just be honest please.
            </p>
          </div>
          <input id="gigTitle" />
        </div>
      </form>
    </div>
  );
}

export default CreateGig;
