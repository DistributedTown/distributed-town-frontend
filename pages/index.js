import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlus, FaUsers } from 'react-icons/fa';
import Blob from '../components/Blob';
import Button from '../components/Button';
import Card from '../components/Card';
import Logo from '../components/Logo';
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
    <div className="flex flex-col items-center flex-1 mx-auto lg:flex-row lg:min-h-screen">
      <Head>
        <title>Distributed Town</title>
      </Head>
      <Info className="relative grid content-center w-full info lg:w-3/5 lg:h-full " />
      <div className="flex flex-col items-center justify-center h-full lg:w-2/5">
        <h1 className="m-8 text-4xl font-bold text-center">
          This is <span>Your Community</span>
        </h1>
        <Card className="flex flex-col p-4 mx-0 mb-4 space-y-4 sm:mx-8 sm:p-8">
          <Link href="/community/create">
            <Button>
              <a className="flex items-center justify-center space-x-4 text-xl">
                <span>Create</span>
                <FaPlus />
              </a>
            </Button>
          </Link>
          <Link href="/community/join">
            <Button>
              <a className="flex items-center justify-center space-x-4 text-xl">
                <span>Join</span>
                <FaUsers />
              </a>
            </Button>
          </Link>
          {/* TODO: Don't show if logged in */}
          <form
            onSubmit={onLoginSubmit}
            className="flex space-x-4 whitespace-nowrap"
          >
            <label>
              <span className="mr-2 text-xl font-bold">Login</span>
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
      <LogoWithBlob />
      <Card className="relative grid gap-8 mx-4 mb-4 text-center lg:w-1/2 lg:justify-self-center lg:align-self-center">
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

function LogoWithBlob() {
  return (
    <div className="relative lg:absolute lg:overflow-hidden lg:h-96 w-72">
      <Logo className="relative z-10 p-8" />
      <Blob
        className="absolute opacity-70"
        style={{
          top: '-130px',
          left: '-70px',
          filter: 'blur(3.5px)',
          transform: 'scale(1.3)',
        }}
      />
    </div>
  );
}

export default Index;
