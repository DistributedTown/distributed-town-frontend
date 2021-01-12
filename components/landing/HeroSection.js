import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';
import Button from '../Button';

export default function HeroSection() {
  return (
    <div className="flex-1 p-4 container mx-auto flex flex-col justify-center gap-8 sm:my-10">
      <h1 className="text-center font-bold text-4xl sm:text-6xl">
        Lorem ipsum <br className="invisible md:visible" />
        dolor sit amet
      </h1>
      <p className="text-center max-w-4xl mx-auto sm:text-2xl font-light text-gray-600">
        Quam nulla molestias facilis quae distinctio ullam incidunt similique
        maxime ipsa, eos rerum accusantium! Nulla vero dolorem iure cupiditate
        aliquam recusandae eligendi.
      </p>
      <Link href="/community/create">
        <Button className="self-center" filled>
          Create a Community
        </Button>
      </Link>
      <FaArrowDown
        size="2em"
        className="mt-8 animate-bounce self-center text-gray-500"
      />
    </div>
  );
}
