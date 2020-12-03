import Head from 'next/head';
import Link from 'next/link';

import { useContext } from 'react';
import { LoggedInContext } from '../components/Store';
import { setUserJourney } from '../utils/userJourneyManager';
import { useMagicLinkLogin } from '../hooks/useMagicLinkLogin';

const Index = () => {
  const [loggedIn] = useContext(LoggedInContext);
  // TODO: Loading while logging in to API after magic link
  const [login] = useMagicLinkLogin();

  const onLoginSubmit = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    login(email);
  };

  return (
    <div className="flex flex-col items-center w-screen lg:flex-row lg:h-screen">
      <Head>
        <title>Distributed Town</title>
      </Head>
      <Info />
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl m-12 font-bold">
          This is <span className="underline">Your Community</span>
        </h1>

        <div className="p-8 border-2 border-denim flex flex-col mx-8 ">
          <div className="border-2 border-red p-1">
            <div className="border-2 border-denim p-4 text-center font-bold">
              <Link
                href="/community/create"
                onClick={() => {
                  setUserJourney({
                    journey: 'community',
                    step: 'category',
                  });
                }}
              >
                <a className="flex justify-around items-center text-xl px-8">
                  Create
                  <img src="/create-plus-button.svg" alt="create community" />
                </a>
              </Link>
            </div>
          </div>
          <div className="border-2 border-red p-1 mt-2">
            <div className="border-2 border-denim p-4 text-center font-bold">
              <Link
                href="/community/join"
                onClick={() => {
                  setUserJourney({
                    journey: 'join',
                    step: 'start',
                  });
                }}
              >
                <a className="flex justify-around items-center text-xl px-8">
                  Join
                  <img src="/create-people-button.svg" alt="join community" />
                </a>
              </Link>
            </div>
          </div>
          {!loggedIn && (
            <div className="border-2 border-red p-1 mt-8">
              <form
                className="border-2 border-denim p-4 grid justify-center"
                onSubmit={onLoginSubmit}
              >
                <label>
                  <span className="mr-2 font-bold text-xl">Login</span>
                  <input
                    className="border border-denim p-1 px-3"
                    placeholder="yourmail@me.io"
                    name="email"
                    type="email"
                  />
                </label>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Info() {
  return (
    <div className="overflow-hidden h-full relative info w-full grid content-center lg:w-2/3 lg:h-full">
      <Logo />
      <div className="relative z-10 p-8 bg-white m-4 border border-black lg:w-1/2 lg:justify-self-center lg:align-self-center">
        <p className="text-center">
          <strong>Distributed Town</strong> is a new financial infrastructure
          for public goods, designed for the real world.
          <br />
          <br />
          It’s built upon mutual, collaborative economics between individuals
          and communities - and a universal identity management based on skills,
          rather than personal data.
        </p>
      </div>
      <style jsx>{`
        .info {
          background-image: url('/background-image.svg');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
}

const logoImage = '/dito-logo.svg';
function Logo() {
  return (
    <div className="relative p-4 lg:absolute">
      <img src={logoImage} alt="Logo" className="relative z-10" />
      <img
        alt=""
        src="/splash-blue-default.svg"
        className="absolute top-0 left-0 opacity-75 z-0"
        style={{
          filter: 'blur(2px)',
          width: '100%',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}

export async function getServerSideProps() {
  let skills = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill`, {
    method: 'GET',
  });
  skills = await skills.json();

  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Index;
