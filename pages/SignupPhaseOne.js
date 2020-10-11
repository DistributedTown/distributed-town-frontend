import {
  MagicContext,
  LoggedInContext,
  LoadingContext,
} from "../components/Store";

import { useContext, useState } from "react";
import SkillPill from "../components/SkillPill";
import SkillsCard from "../components/SkillsCard";

function SignupPhaseOne() {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row max-h-full">
        <div className="flex flex-col space-y-8 container mx-auto">
          <h1>Welcome to Distributed Town!</h1>
          <p>
            This will be a “congrats” message + summary / story about
            Distributed Town, the reasons and benefits in joining it etc.
          </p>
          <div>
            <label htmlFor="nickname">nickname</label>
            <input className="border border-green-600" id="nickname" />
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          <h1>Tell us about you!</h1>
          <p>Pick your Skills (between 1 and 3) Description of the process</p>
          <SkillsCard
            title={"Community lige"}
            skills={[
              { name: "A" },
              { name: "B" },
              { name: "C" },
              { name: "D" },
            ]}
          />
        </div>
      </div>
      <div className="absolute bottom-0 flex justify-center items-center">
        <button type="button">Next: choose your first community!</button>
      </div>
    </div>
  );
}

export default SignupPhaseOne;
