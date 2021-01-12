import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';
import Button from '../Button';

export default function HeroSection() {
  return (
    <div className="container flex flex-col justify-center flex-1 gap-8 p-4 mx-auto sm:my-10">
      <h1 className="text-4xl font-bold text-center sm:text-6xl">
        Lorem ipsum <br className="invisible md:visible" />
        dolor sit amet
      </h1>
      <p className="max-w-4xl mx-auto font-light text-center text-gray-600 sm:text-2xl">
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
        className="self-center mt-8 text-gray-500 animate-bounce"
      />
    </div>
  );
}
