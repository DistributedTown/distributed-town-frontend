import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaBars, FaWallet, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useMagic } from './MagicStore';

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
    // TODO: Implement
    // { text: 'Notifications', icon: <FaBell /> },
    // { text: 'Settings', icon: <FaCog /> },
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
      <main className="flex flex-col w-full min-h-screen md:flex-row">
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
            className={`flex flex-col bg-denim text-white text-xl font-bold w-full absolute overflow-hidden ${
              showNav ? 'h-auto' : 'h-0'
            } md:relative md:h-full md:w-60 md:bg-white md:text-denim shadow`}
          >
            <img className="hidden md:block p-8 mx-auto" src="/isologo.svg" />
            {navItems.map(ni => (
              <button
                type="button"
                key={ni.text}
                className={`m-1 px-4 py-1 text-center tracking-widest ${
                  router.pathname === ni.href
                    ? 'md:text-white md:bg-denim md:shadow rounded'
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
