import SkillPill from "../components/SkillPill";

import { useContext, useState } from "react";
import Store, {
  MagicContext,
  LoggedInContext,
  LoadingContext,
} from "../components/Store";
import { useRouter } from "next/router";

const skills = [
  { text: "Management" },
  { text: "Network Design" },
  { text: "Training & Sport" },
  { text: "Web Development" },
  { text: "DeFi" },
  { text: "Tokenomics" },
  { text: "Painting" },
  { text: "Consensus" },
  { text: "Mobile Dev" },
  { text: "Architecture" },
  { text: "Frontend Dev" },
  { text: "Governance" },
  { text: "Teaching" },
  { text: "Game Theory" },
  { text: "Video Making" },
  { text: "Photography" },
  { text: "Smart Contracts" },
  { text: "Gardening" },
  { text: "Backend Dev" },
  { text: "Householding" },
  { text: "Legal" },
  { text: "Blockchain" },
  { text: "Community" },
];

const Index = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  const [selectedPill, setSelectedPill] = useState(-1);

  const router = useRouter();

  async function handleCreateAccountClick() {
    try {
      let res = await magic.auth.loginWithMagicLink({
        email: "lorenzo.bersano@gmail.com",
      });
      console.log(res);

      let result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${res}`,
          },
        }
      );
      console.log(result);

      setLoggedIn(true);

      router.push("/SignupCompleted");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="h-screen w-full">
      <nav className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/dito-logo.svg" alt="DiTo Logo" />
          <h1>DistributedTown</h1>
        </div>
        <p>What's this about?</p>
      </nav>
      <div className="w-full h-full flex flex-col items-center space-y-8">
        <div className="border-blue-600 border-2 p-8 text-center max-w-sm">
          <h1>Incredibly inspiring text</h1>
        </div>
        <p>Dito dito dito dito dito</p>
        <div className="border-blue-600 border-2 p-8 text-center w-3/4 grid grid-flow-row grid-cols-5 gap-4">
          {skills.map((skill, i) => {
            return (
              <SkillPill
                onClick={() => setSelectedPill(i)}
                key={i}
                text={skill.text}
                selected={selectedPill === i}
              />
            );
          })}
        </div>
        {selectedPill >= 0 ? (
          <button onClick={handleCreateAccountClick} type="button">
            Create account
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Index;
