import Head from 'next/head';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import FullBlock, { FullBlockWhite } from '../components/landing/FullBlock';
import Footer from '../components/landing/Footer';
import PictureBlock from '../components/landing/PictureBlock';
import bgImages from '../utils/bgImages';
import HamburgerMenu from '../components/landing/HamburgerMenu';

export default function Landing() {
  const topNavLinks = [
    { title: 'Docs', href: 'https://docs.distributed.town/' },
  ];

  const footerSections = [
    {
      name: 'Product',
      links: [
        { title: 'Blog', href: 'https://medium.com/@distributed-town' },
        { title: 'Documentation', href: 'https://docs.distributed.town/' },
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
          href: 'https://discord.gg/WR7PbswvTr',
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

  return (
    <>
      <Head>
        <title>Welcome to Distributed Town</title>
      </Head>
      <HamburgerMenu links={topNavLinks} />
      <div className="flex flex-col w-full space-y-8 md:space-y-16">
        <div className="flex flex-col">
          <Header links={topNavLinks} />
          <HeroSection />
        </div>
        <Features />
        <FullBlock />
        <div className="flex flex-col sm:space-y-12">
          <PictureBlock />
          <PictureBlock flip filled imageSrc={bgImages['community life']} />
        </div>
        <FullBlockWhite />
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
