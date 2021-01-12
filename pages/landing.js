import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import FullBlock from '../components/landing/FullBlock';
import Footer from '../components/landing/Footer';

export default function Landing() {
  return (
    <div className="w-full flex flex-col gap-8 md:gap-16">
      <div className="flex flex-col">
        <Header />
        <HeroSection />
      </div>
      <Features />
      <FullBlock />
      <Footer />
    </div>
  );
}
