import Head from "next/head";
import { useContext, useEffect } from "react";
import { LoggedInContext, MagicContext, UserInfoContext } from "./Store";

import NavLink from "./NavLink";
import { useRouter } from "next/router";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);

  const router = useRouter();
  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */

  /*  const communityContract = async () {
     if(userInfo.communityContract) return userInfo.communityContract;
 
   }; */

  const handleLogout = async () => {
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn()); // => `false`
      setLoggedIn(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  // if logged in show the nav menu, if not redirect to unlogged in index page.
  if (loggedIn) {
    return (
      <>
        <Head>
          <title>DistributedTown</title>
        </Head>
        <nav className="flex flex-col h-screen w-64 max-w-sm border-r-2 border-denim">
          <div className="custom-gradient flex justify-center items-start pt-12">
            <img src="/isologo.svg" alt="Logo" />
          </div>
          <ul className="flex flex-col w-full px-4 text-2xl text-center leading-10">
            <NavLink href="/skillwallet">Skill Wallet</NavLink>
            <NavLink href="/community">Dashboard</NavLink>
            <NavLink href="#">Notifications</NavLink>
            <NavLink href="#">Settings</NavLink>
            <li
              className="bg-denim text-white cursor-pointer"
              href="#"
              onClick={e => handleLogout()}
            >
              Logout
            </li>
          </ul>
        </nav>
      </>
    );
  } else {
    if (typeof window !== "undefined") router.push("/");
    return <></>;
  }
};

export default Layout;
