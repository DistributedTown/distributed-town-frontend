import Head from "next/head";
import { useContext, useEffect } from "react";
import { LoggedInContext, MagicContext } from "./Store";

import NavLink from "./NavLink";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [magic] = useContext(MagicContext);

  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  const handleLogout = async () => {
    setLoggedIn(false);
    await magic.user.logout();
  };

  return (
    <>
      <Head>
        <title>DistributedTown</title>
      </Head>
      {loggedIn ? (
        <nav className="flex flex-col h-screen max-w-sm p-4 border-r-2 border-blue-600">
          <div>
            <img src="/dito-logo.svg" alt="Logo" />
          </div>
          <ul className="flex flex-col w-full mt-8">
            <NavLink href="/skillWallet">SkillWallet</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="#">Notifications</NavLink>
            <NavLink href="#">Settings</NavLink>
            <NavLink href="#">Log off</NavLink>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
