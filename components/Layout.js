import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  FaBars,
  FaWallet,
  FaUsers,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useMagic } from './Store';

const Layout = ({ children }) => {
  const magic = useMagic();
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);

  const handleLogout = async () => {
    await magic.user.logout();
    router.push('/');
  };

  const navItems = [
    { href: '/skillwallet', text: 'Skill Wallet', icon: <FaWallet /> },
    { href: '/community', text: 'Dashboard', icon: <FaUsers /> },
    { text: 'Notifications', icon: <FaBell /> },
    { text: 'Settings', icon: <FaCog /> },
    {
      text: 'Logout',
      onClick: handleLogout,
      icon: <FaSignOutAlt />,
    },
  ];

  // if logged in show the nav menu, if not redirect to unlogged in index page.
  return (
    <>
      <Head>
        <title>DistributedTown</title>
      </Head>
      <main className="flex flex-col w-full h-screen md:flex-row">
        <div className="md:hidden flex flex-row bg-denim text-white">
          <button
            className="absolute p-6 focus:outline-none"
            type="button"
            onClick={() => setShowNav(sn => !sn)}
          >
            <FaBars />
          </button>
          <img
            src="/dito-logo.svg"
            className="h-16 p-2 flex-grow text-center"
          />
        </div>
        <div className="relative">
          <nav
            className={`bg-denim text-white w-full absolute overflow-hidden ${
              showNav ? 'h-auto' : 'h-0'
            } md:relative md:h-screen md:w-48 md:bg-white md:text-denim md:border-r-2  md:border-denim`}
          >
            <img className="hidden md:block p-4 mx-auto" src="/isologo.svg" />
            {navItems.map(ni => (
              <button
                type="button"
                key={ni.text}
                className={`w-full px-4 py-1 text-center tracking-widest ${
                  router.pathname === ni.href
                    ? 'md:text-white md:bg-denim'
                    : 'md:text-denim md:bg-white'
                }`}
                onClick={ni.onClick}
              >
                <Link href={ni.href || '#'}>
                  <a className="flex gap-2 items-center justify-center md:justify-start">
                    <span>{ni.icon}</span>
                    <span>{ni.text}</span>
                  </a>
                </Link>
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 h-full">{children}</div>
      </main>
    </>
  );
};

export default Layout;
