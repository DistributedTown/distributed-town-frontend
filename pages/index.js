import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlus, FaUsers } from 'react-icons/fa';
import Button from '../components/Button';
import Card from '../components/Card';
import TextField from '../components/TextField';

import { useMagicLinkLogin } from '../hooks/useMagicLinkLogin';

const Index = () => {
  // TODO: Loading while logging in to API after magic link
  const [login] = useMagicLinkLogin();
  const router = useRouter();

  const onLoginSubmit = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    await login(email);
    await router.push('/skillwallet');
  };

  return (
    <div className="flex flex-col items-center w-screen lg:flex-row lg:h-screen mx-auto">
      <Head>
        <title>Distributed Town</title>
      </Head>
      <Info className="overflow-hidden h-full relative info w-full grid content-center lg:w-2/3 lg:h-full" />
      <div className="h-full flex flex-col justify-center items-center lg:w-1/3">
        <h1 className="text-4xl m-8 font-bold text-center">
          This is <span className="underline">Your Community</span>
        </h1>
        <Card className="p-4 border-2 border-denim flex flex-col mx-0 sm:mx-8 sm:p-8 gap-4">
          <Link href="/community/create">
            <Button>
              <a className="flex gap-4 justify-center items-center text-xl">
                <span>Create</span>
                <FaPlus />
              </a>
            </Button>
          </Link>
          <Link href="/community/join">
            <Button>
              <a className="flex gap-4 justify-center items-center text-xl">
                <span>Join</span>
                <FaUsers />
              </a>
            </Button>
          </Link>
          {/* TODO: Don't show if logged in */}
          <form onSubmit={onLoginSubmit} className="flex gap-4 flex-nowrap">
            <label>
              <span className="mr-2 font-bold text-xl">Login</span>
              <TextField
                name="email"
                type="email"
                placeholder="yourmail@me.io"
              />
            </label>
          </form>
        </Card>
      </div>
    </div>
  );
};

function Info({ className }) {
  return (
    <div className={className}>
      <Logo />
      <Card className="relative z-10 m-4 lg:w-1/2 lg:justify-self-center lg:align-self-center grid gap-8 text-center">
        <p className="text-xl">
          <strong>Distributed Town</strong> is a new financial infrastructure
          for public goods, designed for the real world.
        </p>
        <p className="text-gray-700">
          It’s built upon mutual, collaborative economics between individuals
          and communities - and a universal identity management based on skills,
          rather than personal data.
        </p>
      </Card>
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
