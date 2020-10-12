import {
  MagicContext,
  LoggedInContext,
} from "../components/Store";

import { useContext, useState } from "react";

import { router, useRouter } from "next/router";


function CreateGig() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const [gig, setGig] = useState({
      title: "",
      description: "",
      skills: [],
      creditsOffered: 0
  });

  const router = useRouter();


  const handleChange = (event) => {
    console.log(event.target.id);
    gig[event.target.id] = event.target.value;
    setGig(gig);
  }
  const onSkillsChange = (event) => {
    if(event.target.checked) {
      console.log(event.target.value)
      setGigs([event.target.value]);
    } 
  }
  async function handleClick() {
    try {

      console.log(gig);
      let result = await fetch(
        `http://3.250.29.111:3005/api/gig`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer WyIweDg0M2M4ZWUyNmRlMjU3NGY5YzdlZWRiNTRhZTM5YzZiNzkzMDNjMzJhOWViMjM4NzYwZjNkOTFjY2E2ZTUyOTM0NDA3NzUzMTc3OGRlYzI2Y2NmMWI2MmRlNDIxOWQ3ZWY4NmIyNzI5MWNlOTgxMzRlMzRmOWQyYTg4ZmM0MGNmMWIiLCJ7XCJpYXRcIjoxNjAyNDcwMjA3LFwiZXh0XCI6MTYwMjQ3MTEwNyxcImlzc1wiOlwiZGlkOmV0aHI6MHgzZjEzQUEzNzhFYzA3ZjVENDMyZGVmMjg5YWZlQTU1ZERiYUJFM0Q0XCIsXCJzdWJcIjpcIjFNaDdPM2NmRXU0bGN6am9lYkw3YWNxVVZiU2NRNXRkSU0wV1pWa3B6Mk09XCIsXCJhdWRcIjpcImRpZDptYWdpYzoxYjAzZDUwNS1iOTE3LTRjNDUtYTE2ZC02Y2IxY2EyZWRjOGJcIixcIm5iZlwiOjE2MDI0NzAyMDcsXCJ0aWRcIjpcIjI1Zjc4NGE5LTRlNTUtNDdkNS1hY2Y3LWIzMDJlZWY3YmFkMlwiLFwiYWRkXCI6XCIweGUwODY3YWUwNDBjNzI0ZDVlYjU4NGM2MDQ4MjU0NDMxZjBmODFlYmNjZGFhNTlhYWQwNmFkMDhkNzg1YjgyM2Q3YTlmZjdhOGM0OWJkZmI3NjU4ZjM1Y2Q4NGRhYmFhMjI5MTBiODBlOGYwYTFjMjViYjVhZDAxMDdkODRjYzQwMWJcIn0iXQ==`,
          },
          body: gig
        }
      );
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }


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
          <input className="border border-blue-200" id="title" onChange={handleChange} />

        </div>

        <div className="flex flex-col">
          <div className="flex justify-between">
            <label htmlFor="gigDesciption">Gig description</label>
            <p>
              Hint: be as detailed as possible, and be nice - there are real people on the other side ;)
            </p>
          </div>
          <input className="border border-blue-200" id="description" onChange={handleChange} />
        </div>
      </form>

      <div className="flex w-full p-8">

        <div className="flex flex-col w-full border border-blue-200">
          <h1>Skills needed</h1>
          <h2>Hint: If the gig requires many different skills, consider<br></br>
          breaking it down in 2+ gigs, or starting a new project.
        </h2>
          <div className="grid grid-cols">
            <div className="flex flex-row items-start" >
              <input type="checkbox" />
              <div className="flex flex-col" onChange={onSkillsChange}>
                <p>Blockchain & DLT</p>
              </div>
            </div>
            <div className="flex flex-row items-start" >
              <input type="checkbox" />
              <div className="flex flex-col" onChange={onSkillsChange}>
                <p>Tech</p>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <input type="checkbox" />
              <div className="flex flex-col" onChange={onSkillsChange}>
                <p>Protocol</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full  border border-blue-200">
          <h1>Commitment</h1>
          <h2>Hint: the effort needed for this task. This value<br></br>
          influences the DiTo set as a reward for your gig!
        </h2>
          <div className="grid grid-cols">
            <div className="flex flex-row items-start" >
              <div className="flex flex-row items-start">
                <input type="range" />
                <div className="flex flex-col">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full border border-blue-200">
          <h1>Budget needed</h1>
          <h2>Hint: the amount of DiTo<br></br>
          you offer for this gig.
        </h2>
          <div className="grid grid-cols">
            <div className="flex flex-row items-start">
              <input className="border border-blue-200" id="creditsOffered" onChange={handleChange}/>
              <div className="flex flex-col">
              </div>
            </div>
          </div>
        </div>


      </div>

      <button type="button" className="bg-red-600 text-white w-full" onClick={handleClick}>
        Publish your gig!
        </button>
    </div>
  );
}

export default CreateGig;
