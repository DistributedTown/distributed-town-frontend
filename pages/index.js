import SkillPill from "../components/SkillPill";
import Quote from "../components/Quote";
import RegistrationForm from '../components/RegistrationForm';

import { useContext, useEffect, useState } from "react";
import Store, {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  TokenContext,
  UserInfoContext,
} from "../components/Store";
import { useRouter } from "next/router";
import TheNav from "../components/TheNav";
import bgImages from '../utils/bgImages.js';
import { get, set } from "mongoose";


import communityContractAbi from "../utils/communityContractAbi.json";

import { ethers } from "ethers";

const Index = (props) => {
  const [token, setToken] = useContext(TokenContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [modalState, setModalState] = useState(false);

  const [selectedPill, setSelectedPill] = useState(-1);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const getCommunityBgImg = (selectedCommunity) => {
    return typeof(selectedCommunity !== 'undefined') && selectedCommunity >= 0 ? bgImages[props.skills[selectedCommunity].name.toLowerCase()] : bgImages['default'];
  };

  const getSelectedSkillName = (selectedPill) => {
    return typeof(selectedPill !== 'undefined') && selectedPill >= 0 ?
                        ` ${props.skills[selectedPill].name}` : `${props.skills[0].name}`
  };
  
  const toggleModal = () => {
    setModalState(!modalState);
  };

  const showRegisterModal = () => {setSelectedPill(-1); return toggleModal()};

  async function getCommunityById(id){
    const response = await fectch (`http://localhost:3005/api/community/${id}`,  {
      method: "POST",
      headers: {
        Authorization: `Bearer ${res}`,
      },
    });
    const community = await response.json();
    return community;
  }

  async function saveCommunityContractToUserContext() {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    try {
      const signer = provider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      const contractABI = communityContractAbi;
      const contractAddress = "0x790697f595Aa4F9294566be0d262f71b44b5039c";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setUserInfo({
        ...userInfo,
        communityContract: { address: contractAddress },
      });

    }catch(err){
        console.log(err);
      }
    }
    
  async function fetchUserSkillsJSON(authToken) {
    const skillsRes = await fetch( 
      `http://localhost:3005/api/user`,
      {
        method: "GET",
        headers: {Authorization: `Bearer ${authToken}`},
      }
    );
    const userSkills = await skillsRes.json();
    return userSkills;
  }

   
  async function handleCreateAccountClick(e) {
    e.preventDefault();
    try {     
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        console.log('didToken',didToken);

        const { publicAddress } = await magic.user.getMetadata();

        await fetch("/api/getFunded", {
          method: "POST",
          body: JSON.stringify({ publicAddress }),
        });

        setToken(didToken);

        let result = await fetch(
          `http://localhost:3005/api/user/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
            },
          }
        ); 
      
      setLoggedIn(true);

      const userSkills = await fetchUserSkillsJSON(didToken);
      const haSkills = userSkills[0].skills && Array.isArray(userSkills[0].skills)  && userSkills[0].skills.length > 0;
      if(haSkills && loggedIn){
        setUserInfo({...setUserInfo, skills: userSkills[0].skills});
        console.log('going to the dashboard');
         await saveCommunityContractToUserContext()
        router.push("/skillWallet");
      }  else {
        console.log('starting signup flow');
        router.push("/SignupPhaseOne");
      }
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    if (selectedPill !== -1)
      setUserInfo({
        ...userInfo,
        category: props.skills[selectedPill].subcategory,
        background:getCommunityBgImg(selectedPill),
      });
  }, [selectedPill]);

  return (

    <div className="h-screen w-full">
          <div className="firstPage">
        <TheNav 
           logoUrl="/dito-logo.svg"
           slogan="Distributed Town"
           helpCta="What is it about?"
           helpUrl="#"
           links = {[{text:'Docs',url: '#'}, {text:'Blog', url:'#'}]}
        
        />
        <div className="w-full h-full flex flex-col items-center space-y-8 px-4">
            <Quote 
              quote="Have you ever thought, 'I would like to contribute, but …'"
            />
          <p className="w-1/3 text-gray-500">
            Distributed Town (DiTo) lets you create or join a community with one
            click. No name, location or bank account necessary.
          </p>
          <div className="p-8 text-center w-3/4 grid grid-flow-row grid-cols-5 gap-4">
            {props.skills.map((skill, i) => {
              return (
                <SkillPill
                  onClick={() => {setSelectedPill(i); toggleModal()}}
                  key={i}
                  text={skill.name}
                  selected={selectedPill === i}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={`modalBackground modalVisible-${modalState} bg-white`}>
        <div className="modalWrapper">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col space-y-8 container mx-auto h-screen">
                <img src={getCommunityBgImg(selectedPill)}/>
               </div>
             <div className="flex flex-col justify-between items-center space-y-8 w-full bg-white flex-grow p-8 h-screen">
              
                <div className="p-4 flex flex-col flex-row space-y-4">
                    {selectedPill >= 0 ? (
                      <div className="flex flex-col justify-center mt-6 items-center">
                        <RegistrationForm 
                          onSubmit={handleCreateAccountClick}
                          setEmail={setEmail}
                          title="Welcome to Dito"
                          email = {email}
                          subtitle= {`You will be joining a ${getSelectedSkillName(selectedPill)} community`}
                          cta="Create Account"
                          placeholderText="Please enter your email" 
                        />
                        <a onClick={showRegisterModal} href="#" className=" pt-2 text-gray-500 underline">Select a different community</a>
                      </div>
                      
                    ) : (
                      <></>
                    )}
                 
                </div>
                <div className="w-full">
                  <h4 className="text-gray-500"> DiTo © 2020</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let skills = await fetch(`http://localhost:3005/api/skill`, {
    method: "GET",
  });
  skills = await skills.json();

  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Index;