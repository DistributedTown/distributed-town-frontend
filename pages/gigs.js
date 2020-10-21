import {
  MagicContext,
  LoggedInContext,
  TokenContext,
  UserInfoContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";

import { router, useRouter } from "next/router";


function Gigs() {
  const [token, setToken] = useContext(TokenContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [openGigs, setOpenGigs] = useState([]);

  const router = useRouter();

  console.log('USerrrrrrr SKILLSS');
  console.log('USerrrrrrr SKILLSS');
  console.log('USerrrrrrr SKILLSS here',userInfo);

  useEffect(() => {
    
    const abortController = new AbortController();
    const signal = abortController.signal;
    try{


    async function effect() {
   

      let resFetchGigs = await fetch(
        `http://localhost:3005/api/gig?isOpen=true`,
        {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
        }, { signal: signal });
      const openGigsResp = await resFetchGigs.json();
     
   
      if(!userInfo.skills){
        let resFetchUser = await fetch(
          `http://localhost:3005/api/user`,
          {
            method: "GET",
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
          }, { signal: signal });
          const info = await resFetchUser.json();
          console.log(info);
          setUserInfo ({...userInfo, skills: info[0].skills});
      }
       return  openGigsResp;
      }

      effect().then(openGigsResp => setOpenGigs(openGigsResp));

  
      
    }catch(err){
      console.log(err);
    }
    const cleanup =  () => {
      abortController.abort();
    };
    return cleanup;
  }, []);


const takeGig = (gigID) => {
  try{
  let result = fetch(
    `http://localhost:3005/api/gig/${gigID}/accept`,
    {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    }
    );
  }catch(err){
    console.log(err);
  }
}

return (
  <div className="w-full h-screen p-8">
    <h1 className="underline text-black text-4xl">Open Gigs</h1>
   <div className="flex w-full h-2/3 flex-grow ">
    <div className="grid grid-cols-3 gap-8">
      {openGigs !== null ? openGigs.map((gig, i) => {
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
                <span key={i}>{`#${skill}`}</span>
              ))}
            </div>
                
            <button type="button" className="bg-red-600 text-white w-full" onClick={() => takeGig(gig._id)}>
              Take this gig!
              </button>
          </div>
        );
      })
     
      : <div><h2>Loading Open Gigs...</h2></div>}
    </div>
    </div>
    
    <div className="flex flex-row w-full h-1/3">
        <div className="flex w-1/4">
        <button
            type="button"
            className="p-4 border-2 justify-center  items-center border-blue-600"
            onClick={() => router.push("/createGig")}
          >

            <h2 className="underline font-bold">Create new gig</h2>
            <img className="flex p-3 justify-center items-center" src ="./plusbutton.svg"/>
          
            </button>
        </div>
    <div className="flex w-3/4">
        
        <div className="flex flex-col p-4 border-2 border-blue-600">
            <h2 className="text-bold underline">Your skills</h2>
            <div className="flex border-t-2 border-gray-400 p-2">
             {/*userInfo && Array.isArray(userInfo.userSkills) !== null ?
              userInfo.skills.map((skill, i) => {  return (
                 <div
                 key={i}
                 >
                   {skill.name}

                 </div> );
              }) :  <p>Loading Skills...</p>
            */}
          </div>          
        </div>
    </div>
  


     </div>

  </div>
);
}

export default Gigs;
