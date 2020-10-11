import Head from "next/head";
import { useContext } from "react";
import { LoggedInContext, MagicContext } from "./Store";
import Link from "next/link";

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
      {!loggedIn ? (
        <></>
      ) : (
        <>
          <Head>
            <title>DistributedTown</title>
          </Head>
          <nav className="flex flex-col max-w-sm">
            <div>
              <img src="/dito-logo.svg" alt="Logo" />
            </div>
            {/* If a user is logged in, show our Welcome message and Logout button */}
            {loggedIn ? (
              <>
                <div className="nav-user">Welcome, {loggedIn}</div>
                <div className="logout-btn">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </>
            ) : (
              // Else, show the Login button
              <>
                <Link href="/login">
                  <div className="login-btn">
                    <a>Log in</a>
                  </div>
                </Link>
              </>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default Layout;
