import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaBars, FaWallet, FaUsers, FaSignOutAlt, FaBell, FaCog } from 'react-icons/fa';
import Blob from "../components/Blob";

const Layout = (props, { children }) => {
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  const color = props.color === '#146EAA' ? "denim" : "burgundy";

  const handleLogout = async () => {
    // TODO logout
    router.push('/');
  };

  const navItems = [
    { href: '/skillwallet', text: 'SkillWallet', icon: <FaWallet /> },
    { href: '/community', text: 'diTown Hall', icon: <FaUsers /> },
    // TODO: Implement
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
      <main className="flex flex-col w-full min-h-screen md:flex-row">
        <div className="flex flex-row text-white md:hidden bg-denim">
          <button
            className="absolute p-6 focus:outline-none"
            type="button"
            onClick={() => setShowNav(sn => !sn)}
          >
            <FaBars />
          </button>
        </div>
        <div className="relative">
          <nav
            className={`flex flex-col items-center bg-denim text-white text-xl font-bold w-full absolute overflow-hidden ${
              showNav ? 'h-auto' : 'h-0'
            } md:relative md:h-full md:w-60 md:bg-white md:text-denim shadow`}
          >
          <div className="relative lg:absolute lg:overflow-hidden lg:h-96 w-72">
          <Blob
          className="absolute opacity-70"
          color={props.color}
          style={{
            top: '-130px',
            left: '-70px',
            right: '-30px',
            filter: 'blur(3.5px)',
            transform: 'scale(1.3)',
          }}
        />
        </div>
        <img className="hidden p-8 mb-40 mx-auto md:block z-10" src="/isologo.svg" />
            {navItems.map((ni, id) => (
              <button
                type="button"
                key={ni.text}
                id={`layoutButton${id}`}
                className={`m-1 px-4 w-10/12 py-1 mb-4 text-center tracking-widest rounded-full border-2 
                          ${props.color === "#BD413B" ? "border-burgundy md:text-burgundy" : "border-denim text-denim"}
                            border-${props.color === "#BD413B" ? "burgundy" : "denim"} 
                            ${router.pathname === ni.href
                    ? `md:text-white md:bg-${color} md:shadow rounded`
                    : `md:text-${color} md:bg-white`
                }`}
                onClick={ni.onClick}
              >
                <Link href={ni.href || '#'}>
                  <a className="flex items-center justify-center space-x-2 md:justify-start">
                    <span>{ni.icon}</span>
                    <span>{ni.text}</span>
                  </a>
                </Link>
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 h-full overflow-y-auto">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
