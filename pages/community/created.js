import { useContext } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import {
  MagicContext,
  LoggedInContext,
  UserInfoContext,
  TokenContext
} from "../../components/Store";

function Created() {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const router = useRouter();

  return (
    <Layout
      navBar
      logo
      splash={{
        color: "rain-forest",
        variant: "quad",
        alignment: "left"
      }}
    >
      <div className="w-full flex flex-col items-center justify-between space-y-8 pt-32 h-full">
        <div className="flex-1 text-center flex items-center flex-col">
          <h1 className="text-5xl font-bold">Congrats!</h1>
          <h2 className="text-4xl">
            You have founded{" "}
            {(userInfo &&
              userInfo.communityContract &&
              user.communityContract.name) ||
              "Community"}
            !
          </h2>
          <p className="text-orange text-3xl mt-8">Your Community now has:</p>
          <div className="bg-rain-forest rounded-full flex flex-col p-8 items-center justify-center h-64 w-64 mt-4">
            <img src="/dito-tokens.svg" />
            <p className="text-orange mt-4">96000 DiTo</p>
          </div>
        </div>
        <div className="w-full flex justify-between bottom-0 right-0 border-2 border-gray-400 px-48">
          <div className="border-alizarin border-2 mr-8 p-2">
            <button
              type="button"
              onClick={() => router.push("#")}
              className="border-2 border-rain-forest p-2 w-full text-3xl font-bold"
            >
              Invite new Members
            </button>
          </div>
          <div className="border-alizarin border-2 mr-8 p-2 w-64">
            <button
              type="button"
              onClick={() => router.push("/community/join")}
              className="border-2 border-rain-forest p-2 w-full text-3xl font-bold"
            >
              Pick your Skills
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Created;
