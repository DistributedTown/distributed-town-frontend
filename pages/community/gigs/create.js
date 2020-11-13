import {
  MagicContext,
  LoggedInContext,
  TokenContext,
  UserInfoContext
} from "../../../components/Store";
import Layout from "../../../components/Layout";

import { useContext, useState } from "react";

import { useRouter } from "next/router";

function CreateGig() {
  // const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  // const [token, setToken] = useContext(TokenContext);
  // const [magic] = useContext(MagicContext);

  const [gig, setGig] = useState({
    title: "",
    description: "",
    skills: [],
    creditsOffered: 0
  });

  const router = useRouter();

  const handleChange = event => {
    gig[event.target.id] = event.target.value;
    setGig(gig);
  };
  const onSkillsChange = event => {
    if (event.target.checked) {
      gig.skills = [...gig.skills, event.target.id];
      setGig(gig);
    }
  };

  async function postNewGig() {
    try {
      const payload = {
        title: gig.title,
        description: gig.description,
        skills: gig.skills,
        creditsOffered: parseInt(gig.creditsOffered)
      };

      console.log("create gigs payload", payload);
      console.log("create gigs token", token);
      let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + token
        }),
        body: JSON.stringify(payload)
      });

      console.log(result);
      router.push("/gigs");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    postNewGig();
  }

  return (
    <Layout
      navBar
      flex
      logo
      splash={{
        color: "alizarin",
        variant: "quad"
      }}
    >
      <div className="w-full h-screen p-8 space-y-3">
        <h1 className="underline text-black text-4xl">Create New Gig</h1>
        <div className="flex flex-col border-l-2 border-denim p-2">
          <form className="border-l-2 flex flex-col pl-4">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  className="font-bold  text-xl underline"
                  htmlFor="gigTitle"
                >
                  Gig Title
                </label>
                <p className="text-dove-gray">
                  Hint: a short, clear title will catch contributors’ attention.
                  Just be honest please.
                </p>
              </div>
              <input
                className="border border-dove-gray py-3 mb-5 px-2 "
                id="title"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  className="font-bold  text-xl underline"
                  htmlFor="gigDesciption"
                >
                  Gig Description
                </label>
                <p className="text-dove-gray">
                  Hint: be as detailed as possible, and be nice - there are real
                  people on the other side ;)
                </p>
              </div>
              <textarea
                style={{ border: " 1px solid #707070" }}
                className="border border-dove-gray py-6 px-2"
                id="description"
                onChange={handleChange}
                required
              >
                {" "}
              </textarea>
            </div>
          </form>

          <div className="flex flex-wrap w-full">
            <div className="flex flex-col sm:w-1/2 lg:w-1/3 space-y-2 p-2">
              <div className="flex flex-col flex-1 px-10 py-12">
                <div className="flex-1 mb-12">
                  <h1 className="font-bold text-xl underline">Skills needed</h1>
                  <h2 className="text-dove-gray">
                    Hint: If the gig requires many different skills, consider
                    <br></br>
                    breaking it down in 2+ gigs, or starting a new project.
                  </h2>
                </div>
                <div className="flex flex-row items-start">
                  <input
                    type="checkbox"
                    key={"Blockchain & DLT"}
                    id="Blockchain & DLT"
                    onChange={onSkillsChange}
                  />
                  <div className="flex flex-col font-bold pl-2">
                    <p>Blockchain & DLT</p>
                  </div>
                </div>
                <div className="flex flex-row items-start">
                  <input
                    type="checkbox"
                    key={"Tech"}
                    id="Tech"
                    onChange={onSkillsChange}
                  />
                  <div className="flex flex-col font-bold pl-2">
                    <p>Tech</p>
                  </div>
                </div>
                <div className="flex flex-row items-start">
                  <input
                    type="checkbox"
                    key={"Protocol"}
                    id="Protocol"
                    onChange={onSkillsChange}
                  />
                  <div className="flex flex-col font-bold pl-2">
                    <p>Protocol</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:w-1/2 lg:w-1/3 space-y-2 p-2">
              <div className="flex flex-col flex-1 px-10 py-12">
                <div className="flex-1">
                  <h1 className="font-bold  text-xl underline">Commitment</h1>
                  <h2 className="text-dove-gray">
                    Hint: the effort needed for this task. This value<br></br>
                    influences the DiTo set as a reward for your gig!
                  </h2>
                </div>

                <input
                  step={10}
                  style={{ width: "250px" }}
                  className="bg-white h-32 py-3 w-32"
                  type="range"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:w-1/2 lg:w-1/3 space-y-2 p-2">
              <div className="flex flex-col flex-1 px-10 py-12">
                <div className="flex-1 mb-12">
                  <h1 className="font-bold text-xl underline">Budget needed</h1>
                  <h2 className="text-dove-gray">
                    Hint: the amount of DiTo<br></br>
                    you offer for this gig.
                  </h2>
                </div>
                <input
                  className="border-2 border-denim py-6 px-4 mb-3"
                  id="creditsOffered"
                  type="number"
                  onChange={handleChange}
                />
                <h2 className="text-right">DiTo</h2>
              </div>
            </div>
          </div>

          <button
            type="button"
            className=" py-3 text-lg underline bg-alizarin text-white w-full"
            onClick={handleClick}
          >
            Publish your gig!
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default CreateGig;
