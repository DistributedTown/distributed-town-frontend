import SkillPill from "../components/SkillPill";

import { useContext, useEffect, useState } from "react";
import Store, {
  MagicContext,
  LoggedInContext,
  LoadingContext,
  TokenContext,
  UserInfoContext,
} from "../components/Store";
import { useRouter } from "next/router";

const skills = [
  { text: "Management", category: "" },
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

const Index = (props) => {
  const [token, setToken] = useContext(TokenContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);

  const [selectedPill, setSelectedPill] = useState(-1);
  const [email, setEmail] = useState("");

  const router = useRouter();

  async function handleCreateAccountClick(e) {
    e.preventDefault();

    try {
      let res = await magic.auth.loginWithMagicLink({
        email,
      });
      console.log(res);

      const { publicAddress } = await magic.user.getMetadata();

      await fetch("/api/getFunded", {
        method: "POST",
        body: JSON.stringify({ publicAddress }),
      });

      setToken(res);

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

      router.push("/SignupPhaseOne");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (selectedPill !== -1)
      setUserInfo({
        ...userInfo,
        category: props.skills[selectedPill].subcategory,
      });
  }, [selectedPill]);

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
          <h1>Have you ever thought, “I would like to contribute, but …” </h1>
        </div>
        <p>
          Distributed Town (DiTo) lets you create or join a community with one
          click. No name, location or bank account necessary.
        </p>
        <div className="border-blue-600 border-2 p-8 text-center w-3/4 grid grid-flow-row grid-cols-5 gap-4">
          {props.skills.map((skill, i) => {
            return (
              <SkillPill
                onClick={() => setSelectedPill(i)}
                key={i}
                text={skill.name}
                selected={selectedPill === i}
              />
            );
          })}
        </div>
        {selectedPill >= 0 ? (
          <form onSubmit={handleCreateAccountClick} className="flex flex-col">
            <label htmlFor="email">Your email address</label>
            <input
              className="border border-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
            <input type="submit" value="Create account" />
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let skills = await fetch("http://3.250.29.111:3005/api/skill", {
    method: "GET",
  });
  skills = await skills.json();

  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Index;
