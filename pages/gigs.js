import {
  MagicContext,
  LoggedInContext,
  TokenContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";

import { router, useRouter } from "next/router";

import ditoContractAbi from "../utils/ditoTokenContractAbi.json";

function Gigs() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const [openGigs, setOpenGigs] = useState([]);
  const [token, setToken] = useContext(TokenContext);

  const router = useRouter();

  useEffect(() => {
    async function effect() {
      let resp = await fetch(
        `http://3.250.29.111:3005/api/gig?isOpen=false`,
        {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + 'WyIweGY3MTMxOGQ5MDQ4YmIwZDA3YTRlNWIxOWM3ZWNjZjBkYzcyZjA4MGE5NTdhNGZhNmQxZTAwNmFkNTNmYWViYTc2Njg4NzI2OWI0MTg5NGE0YmE3OGNmOWNkYjk0NWIxYmFmYTI0ZTY0NmY1NjNmZjAxNWQ0OTEwNjhkODEyMWQwMWMiLCJ7XCJpYXRcIjoxNjAyNDc4NTc0LFwiZXh0XCI6MTYwMjQ3OTQ3NCxcImlzc1wiOlwiZGlkOmV0aHI6MHgzZjEzQUEzNzhFYzA3ZjVENDMyZGVmMjg5YWZlQTU1ZERiYUJFM0Q0XCIsXCJzdWJcIjpcIjFNaDdPM2NmRXU0bGN6am9lYkw3YWNxVVZiU2NRNXRkSU0wV1pWa3B6Mk09XCIsXCJhdWRcIjpcImRpZDptYWdpYzowZTAwMjI0OS0wYmY0LTQ2ODMtOWFlNi0zZDUxMjhhYzQyNTZcIixcIm5iZlwiOjE2MDI0Nzg1NzQsXCJ0aWRcIjpcImM2MzUwZTljLTBiYTItNDczZS1hYTIwLWZmYmQzMjczM2ZlYVwiLFwiYWRkXCI6XCIweGUwODY3YWUwNDBjNzI0ZDVlYjU4NGM2MDQ4MjU0NDMxZjBmODFlYmNjZGFhNTlhYWQwNmFkMDhkNzg1YjgyM2Q3YTlmZjdhOGM0OWJkZmI3NjU4ZjM1Y2Q4NGRhYmFhMjI5MTBiODBlOGYwYTFjMjViYjVhZDAxMDdkODRjYzQwMWJcIn0iXQ==',
            'Content-Type': 'application/json'
          },
        });
      const openGigsResp = await resp.json();
      return openGigsResp;
    }
    effect().then(openGigsResp => setOpenGigs(openGigsResp));
  }, []);

const takeGig = (gigID) => {
  let result = fetch(
    `http://3.250.29.111:3005/api/gig/${gigID}/accept`,
    {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + 'WyIweGY3MTMxOGQ5MDQ4YmIwZDA3YTRlNWIxOWM3ZWNjZjBkYzcyZjA4MGE5NTdhNGZhNmQxZTAwNmFkNTNmYWViYTc2Njg4NzI2OWI0MTg5NGE0YmE3OGNmOWNkYjk0NWIxYmFmYTI0ZTY0NmY1NjNmZjAxNWQ0OTEwNjhkODEyMWQwMWMiLCJ7XCJpYXRcIjoxNjAyNDc4NTc0LFwiZXh0XCI6MTYwMjQ3OTQ3NCxcImlzc1wiOlwiZGlkOmV0aHI6MHgzZjEzQUEzNzhFYzA3ZjVENDMyZGVmMjg5YWZlQTU1ZERiYUJFM0Q0XCIsXCJzdWJcIjpcIjFNaDdPM2NmRXU0bGN6am9lYkw3YWNxVVZiU2NRNXRkSU0wV1pWa3B6Mk09XCIsXCJhdWRcIjpcImRpZDptYWdpYzowZTAwMjI0OS0wYmY0LTQ2ODMtOWFlNi0zZDUxMjhhYzQyNTZcIixcIm5iZlwiOjE2MDI0Nzg1NzQsXCJ0aWRcIjpcImM2MzUwZTljLTBiYTItNDczZS1hYTIwLWZmYmQzMjczM2ZlYVwiLFwiYWRkXCI6XCIweGUwODY3YWUwNDBjNzI0ZDVlYjU4NGM2MDQ4MjU0NDMxZjBmODFlYmNjZGFhNTlhYWQwNmFkMDhkNzg1YjgyM2Q3YTlmZjdhOGM0OWJkZmI3NjU4ZjM1Y2Q4NGRhYmFhMjI5MTBiODBlOGYwYTFjMjViYjVhZDAxMDdkODRjYzQwMWJcIn0iXQ==',
        'Content-Type': 'application/json'
      },
    }
  );
}

return (
  <div className="w-full h-screen p-8">
    <h1>Open Gigs</h1>
    <div className="grid grid-cols-3 gap-8">
      {openGigs.map((gig, i) => {
        return (
          <div
            key={i}
            className="border-2 border-blue-600 flex flex-col shadow"
          >
            <div className="flex justify-between border-b-2 border-gray-400 p-2">
              <p>{gig.title}</p>
              <p>DiTo offered: {gig.creditsOffered}</p>
            </div>
            <p className="p-2">{gig.description}</p>
            <div className="flex border-t-2 border-gray-400 p-2">
              <p>Skills needed: </p>
              {gig.skills.map((skill, j) => (
                <span>{`#${skill}`}</span>
              ))}
            </div>
                
            <button type="button" className="bg-red-600 text-white w-full" onClick={() => takeGig(gig._id)}>
              Take this gig!
              </button>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between mt-8">
      <button
        type="button"
        className="p-4 border-2 border-blue-600"
        onClick={() => router.push("/createGig")}
      >
        Create new gig
        </button>
      <div className="flex flex-col p-4 border-2 border-blue-600">
        <h2>Your skills</h2>
      </div>
    </div>
  </div>
);
}

export default Gigs;
