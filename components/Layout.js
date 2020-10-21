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

  const logout = (e) =>{
    e.preventDefault();
    setLoggedIn(false);
    router.push("/");
    console.log('logged?', loggedIn);
  }

  /* const handleLogout = async () => {
    
    try {
      await m.user.logout();
      console.log(await magic.user.isLoggedIn()); // => `false`
    } catch(err) {
      console.log(err);
    }
  }; */

  return (
    <>
      <Head>
        <title>DistributedTown</title>
      </Head>
      {loggedIn && userInfo.communityContract ? (
        <nav className="flex flex-col h-screen max-w-sm p-4 border-r-2 border-denim">
          <div>
            <img src="/isologo.svg" alt="Logo" />
          </div>
          <ul className="flex flex-col w-full mt-8">
            <NavLink href="/skillWallet">SkillWallet</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="#">Notifications</NavLink>
            <NavLink href="#">Settings</NavLink>
            <NavLink href="#" onClick={logout}>Logout</NavLink>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
