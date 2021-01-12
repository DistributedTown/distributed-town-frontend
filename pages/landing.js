import Head from 'next/head';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import FullBlock, { FullBlockWhite } from '../components/landing/FullBlock';
import Footer from '../components/landing/Footer';
import PictureBlock from '../components/landing/PictureBlock';
import bgImages from '../utils/bgImages';
import HamburgerMenu from '../components/landing/HamburgerMenu';

export default function Landing() {
  return (
    <div className="flex flex-col w-full gap-8 md:gap-16">
      <Head>
        <title>Welcome to Distributed Town</title>
      </Head>
      <HamburgerMenu />
      <div className="flex flex-col">
        <Header />
        <HeroSection />
      </div>
      <Features />
      <FullBlock />
      <div className="flex flex-col sm:gap-12">
        <PictureBlock />
        <PictureBlock flip filled imageSrc={bgImages['community life']} />
      </div>
      <FullBlockWhite />
      <Footer />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: { disableMagicLinks: true },
  };
}
