import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';
import Button from '../Button';

export default function HeroSection({
  mainText,
  secondaryText,
  ctaText,
  ctaHref,
}) {
  return (
    <div className="container flex flex-col justify-center flex-1 p-4 mx-auto space-y-8 sm:my-10">
      <h1 className="text-4xl font-bold text-center sm:text-6xl">{mainText}</h1>
      <p className="max-w-4xl mx-auto font-light text-center text-gray-600 sm:text-2xl">
        {secondaryText}
      </p>
      <Link href={ctaHref}>
        <Button className="self-center" filled>
          {ctaText}
        </Button>
      </Link>
      <FaArrowDown
        size="2em"
        className="self-center mt-8 text-gray-500 animate-bounce"
      />
    </div>
  );
}
