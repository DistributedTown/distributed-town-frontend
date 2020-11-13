import Head from "next/head";
import { useContext, useEffect } from "react";
import { LoggedInContext, MagicContext, UserInfoContext } from "./Store";

import NavLink from "./NavLink";
import { useRouter } from "next/router";

const colors = {
  denim: "#146EAA",
  alizarin: "#E63229",
  "rain-forest": "#00825B"
};

const Layout = ({
  flex = false,
  splash,
  bgImage = {},
  logo,
  navBar,
  children
}) => {
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

  const {
    src: bgImageSrc,
    alignment: bgImageAlignment,
    size: bgImageSize
  } = bgImage;
  let logoImage = null;
  if (logo) {
    logoImage = logo.withText ? "/dito-logo.svg" : "/isologo.svg";
  }

  let splashElement = null;
  if (splash) {
    if (splash.variant === "quad") {
      splashElement = (
        <div
          className={`absolute h-64 w-48 border-r-2 border-denim`}
          style={{
            background: `linear-gradient(-40deg, rgba(255, 255, 255, 1) 38%, ${
              colors[splash.color]
            } 38.5%)`
          }}
        />
      );
    } else {
      splashElement = (
        <img
          src={`/splash-${splash.color}-${splash.variant}.svg`}
          className={`fixed top-0 ${splash.alignment}-0 ${
            splash.isTranslucent ? "opacity-75" : "opacity-100"
          }`}
          style={{
            ...(splash.isTranslucent ? { filter: "blur(2px)" } : {}),
            ...(splash.zIndex ? { zIndex: splash.zIndex } : {})
          }}
        />
      );
    }
  }

  // if logged in show the nav menu, if not redirect to unlogged in index page.
  return (
    <>
      <Head>
        <title>DistributedTown</title>
      </Head>
      <main
        style={{
          ...(bgImageSrc
            ? {
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: `${bgImageSize ? bgImageSize : 50}%`
              }
            : {})
        }}
        className={`flex h-screen w-full bg-no-repeat ${
          navBar ? "bg-bgImage" : ""
        } ${bgImageAlignment ? "bg-" + bgImageAlignment : ""}`}
      >
        {splashElement}
        {logoImage && (
          <div
            className={`pt-4 pl-${logo.withText ? "4" : "8"} fixed max-w-xxs`}
          >
            <img src={logoImage} alt="Logo" />
          </div>
        )}
        {navBar && (
          <nav className="flex flex-col h-screen w-48 max-w-sm p-4 pt-64 border-r-2 border-denim">
            {loggedIn && !navBar.hideNav ? (
              <ul className="flex flex-col w-full mt-8 text-xl">
                <NavLink href="/skillwallet">Skill Wallet</NavLink>
                <NavLink href="/community">Dashboard</NavLink>
                <NavLink href="#">Notifications</NavLink>
                <NavLink href="#">Settings</NavLink>
                <NavLink href="#" onClick={e => handleLogout()}>
                  Logout
                </NavLink>
              </ul>
            ) : (
              <ul className="flex flex-col w-full mt-8 text-xl justify-end items-center flex-1">
                <NavLink href="/community/create">
                  <img src="/create-people-button.svg" />
                </NavLink>
              </ul>
            )}
          </nav>
        )}
        <div className={`flex-1 h-full ${flex ? "flex" : ""}`}>{children}</div>
      </main>
    </>
  );
  return null;
};

export default Layout;
