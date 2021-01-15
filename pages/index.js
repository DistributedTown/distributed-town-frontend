import Head from 'next/head';
import {
  FaBuilding,
  FaDiscord,
  FaGithub,
  FaHandsHelping,
  FaLink,
  FaPalette,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';
import Link from 'next/link';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import FullBlock, { FullBlockWhite } from '../components/landing/FullBlock';
import Footer from '../components/landing/Footer';
import PictureBlock from '../components/landing/PictureBlock';
import bgImages from '../utils/bgImages';
import HamburgerMenu from '../components/landing/HamburgerMenu';
import Button from '../components/Button';

const discordUrl = 'https://discord.gg/WR7PbswvTr';
const docsUrl = 'https://docs.distributed.town/';

export default function Landing() {
  const topNavLinks = [{ title: 'Docs', href: docsUrl, isButton: true }];

  const footerSections = [
    {
      name: 'Product',
      links: [
        { title: 'Blog', href: 'https://medium.com/@distributed-town' },
        { title: 'Documentation', href: docsUrl },
      ],
    },
    {
      name: 'Community',
      links: [
        {
          title: (
            <span className="flex flex-row items-center space-x-2">
              <FaDiscord />
              <span>Discord</span>
            </span>
          ),
          href: discordUrl,
        },
        {
          title: (
            <span className="flex flex-row items-center space-x-2">
              <FaGithub />
              <span>Github</span>
            </span>
          ),
          href: 'https://github.com/DistributedTown',
        },
      ],
    },
  ];

  const pillars = [
    {
      icon: BiNetworkChart,
      title: 'Self-organization & Sustainability',
      text: 'A self-organizing network - made by individuals.',
      details:
        'Each DiTo Community is like a micro-nation – with its micro-economy, culture, and vision. We give you credits to attract the talent that you need – just invite others to join you, create a new gig, and contribute to the projects of your fellow citizens.',
    },
    {
      icon: FaUser,
      title: 'Pseudonymity, and Skills as a currency.',
      text: 'Pick your skills, and start earning credits.',
      details:
        'New members receive credits straight away, based on their unique skills. Also, DiTo is 100% pseudonymous, and Members’ identities are tied exclusively to their Skills: no personal data required, only your talent and contributions matter.',
    },
    {
      icon: FaUsers,
      title: 'Collective Autonomy & Personal Mobility.',
      text: 'Be free. No questions asked.',
      details:
        'As a new Citizen, you’ll receive your unique Skill Wallet, with the skills you picked, and the credits you’ve earned. Use it to move to a new community, join events, or just launch a new project. No passports, résumés or bank accounts required. Ever again.',
    },
  ];

  const categories = [
    {
      icon: <FaLink size="3rem" />,
      title: 'Blockchain & Web 3',
      subtitle: 'For small, functional Web3 teams aiming to:',
      text: (
        <ul className="text-left list-disc list-inside">
          <li>keep accounting & run proposals</li>
          <li>fair, milestone-based fundings for your project</li>
          <li>distribute tasks efficiently for hackathons & sprints</li>
          <li>coordinate between the members of a DAO</li>
        </ul>
      ),
      button: (
        <Link href="/community/create">
          <Button>Create</Button>
        </Link>
      ),
    },
    {
      icon: <FaPalette size="3rem" />,
      title: 'Art, Events & Lifestyle',
      subtitle: 'For artists & creative minds who want to:',
      text: (
        <ul className="text-left list-disc list-inside">
          <li>assign community credits to their members</li>
          <li>coordinate multi-disciplinary projects and events</li>
          <li>get fair royalties & continuous flow of funding</li>
          <li>update gaming scores & rank</li>
        </ul>
      ),
      imageSrc: bgImages['art, music & creativity'],
      button: (
        <Link href="/community/create">
          <Button>Create</Button>
        </Link>
      ),
    },
    {
      icon: <FaBuilding size="3rem" />,
      title: 'Local Community',
      subtitle: 'For neighbors, condos & small local clubs who need to:',
      text: (
        <ul className="text-left list-disc list-inside">
          <li>hold a common treasury</li>
          <li>keep track of reputation & commitment</li>
          <li>organize & fund local projects</li>
          <li>divide tasks for mutual support</li>
        </ul>
      ),
      imageSrc: bgImages['community life'],
      button: (
        <Link href="/community/create">
          <Button>Create</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Welcome to Distributed Town</title>
      </Head>
      <HamburgerMenu links={topNavLinks} />
      <div className="flex flex-col w-full space-y-8 md:space-y-16">
        <div className="flex flex-col">
          <Header links={topNavLinks} />
          <HeroSection
            mainText={
              <>
                Be a Citizen
                <br />
                of a Distributed Town
              </>
            }
            secondaryText="DiTo is a Mutual Credit network to create or join a self-sovereign Community. Receive your Decentralized, Pseudonymous Identity, coordinate tasks efficiently, and earn Credits for your project. In seconds."
            ctaText="Open App"
            ctaHref="/app-welcome"
          />
        </div>
        <Features
          title="Our Pillars"
          features={pillars}
          ctaText="Be a part of it"
          ctaHref="/app-welcome"
        />
        <FullBlock
          title={
            <>
              From a system based on <strong>Money</strong>
              <br />
              to a system based on
              <strong> Value</strong>.
            </>
          }
          subtitle="Build something greater than yourself."
          text="DistributedTown introduces a new financial paradigm based on Mutual Credit.
The DITO Credits are a non-speculative currency that citizens can use to exchange value & services all across the network. It’s based on meritocracy and distribution – with no individual accumulation of wealth."
          ctaText="Read more"
          ctaHref={docsUrl}
        />
        <div className="flex flex-col sm:space-y-12">
          <PictureBlock {...categories[0]} />
          <PictureBlock {...categories[1]} flip filled />
          <PictureBlock {...categories[2]} />
        </div>
        <FullBlockWhite
          icon={<FaHandsHelping className="self-center" size="7rem" />}
          title="The mutual layer of collaboration."
          subtitle="Become a citizen of a Distributed Town."
          text="Create, organize, contribute – every skill is valuable, from gardening, to smart contract’s design. Join us, and let’s build the future of Collaborative Economics. Together."
          buttons={
            <>
              <Link href="/community/create">
                <Button filled>Create your Community</Button>
              </Link>
              <Link href={discordUrl}>
                <Button>Join us on Discord</Button>
              </Link>
            </>
          }
        />
        <Footer sections={footerSections} />
      </div>
    </>
  );
}

export function getStaticProps() {
  return {
    props: { disableMagicLinks: true },
  };
}
