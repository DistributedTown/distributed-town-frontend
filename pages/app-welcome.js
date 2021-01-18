import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlus, FaUsers } from 'react-icons/fa';
import Blob from '../components/Blob';
import Button from '../components/Button';
import Card from '../components/Card';
import Logo from '../components/Logo';
import TextField from '../components/TextField';
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'
import {getSkillWalletByID, storeSkillWallet, SkillWalletIDX} from './threaddb.config';

import { useMagicLinkLogin } from '../hooks/useMagicLinkLogin';

const Index = () => {
  // TODO: Loading while logging in to API after magic link
  const [login] = useMagicLinkLogin();
  const router = useRouter();
  const threeID = new ThreeIdConnect()


  const onLoginSubmit = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    await login(email);
    await router.push('/skillwallet');
  };

  const storeSkillWalletThreadDB = async () => {
    // const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
    // console.log('1');
    // await ceramic.setDIDProvider(provider)
    // console.log('2');
    // createIDX(ceramic)
    // console.log('3');
  
    // window.did = idx.did
    // console.log(idx.did);
    // console.log('creating a schema');
    // const schema = await publishSchema(ceramic, { content: DiToSkillWalletIDXSchema, name: 'DiToSkillWallet' })
    // console.log('schema created')
    // console.log(schema);
    // const definition = await createDefinition(ceramic, {
    //   name: 'SkillWallet',
    //   description: 'The Distributed Town Skill Wallet deffinition',
    //   schema: schema.commitId.toUrl(),
    // })
    // console.log(definition);
    // console.log('definition created');
    // return '';
  
  console.log('storing in threaddb')
    const ids = await storeSkillWallet({
      skillWallet: [{ skill: 'Teaching', level: 8 }, { skill: 'Gardening', level: 9 }]
    })
    console.log('stored in threaddb')
  
    console.log(ids);
    // const skillWallet = {
    //   skillWalletID: ids[0]
    // }
  
    // console.log('setting skill wallet');
    // const skillWalletStored = await idx.set(definition.id.toString() ,skillWallet);
    // console.log('skillWalletStored', skillWalletStored);
  
    // const getResult = await idx.get(definition.id.toString()) as SkillWalletIDX;
    // console.log('get result: ', getResult)
  
    const fromDB = await getSkillWalletByID(ids[0])
    console.log('result from threaddb');
    console.log(fromDB)
    // return idx.id
  }
  const getProvider = async event => {
    window.web3 = new Web3(window.web3.currentProvider);
    const addresses = await window.ethereum.enable();
    console.log(addresses);
    await threeID.connect(new EthereumAuthProvider(window.web3, addresses[0]))
    threeID.getDidProvider()
  }
  const onConnectWithMetamaskClick = async event => {
    await getProvider();
    try{
      await storeSkillWalletThreadDB();
    } catch(err) {
      await storeSkillWalletThreadDB();
    }
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

          <Button
            onClick={onConnectWithMetamaskClick}
            className="flex space-x-4 whitespace-nowrap"
          >
            <span>Connect With Metamask</span>
          </Button>
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
