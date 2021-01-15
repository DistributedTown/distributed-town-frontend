import Link from 'next/link';
import Button from '../Button';

export default function FullBlock({
  icon,
  title,
  subtitle,
  text,
  ctaText,
  ctaHref,
}) {
  return (
    <div className="flex flex-col px-8 py-16 space-y-12 text-center text-white bg-denim">
      <div className="container flex flex-col mx-auto space-y-8">
        {icon}
        <h2 className="max-w-3xl mx-auto text-3xl font-bold sm:text-5xl">
          {title}
        </h2>
        <h3 className="text-2xl font-light">{subtitle}</h3>
        <h3 className="max-w-4xl mx-auto font-light sm:text-xl">{text}</h3>
        <Link href={ctaHref}>
          <Button
            className="self-center"
            style={{ border: '2px solid white' }}
            filled
          >
            {ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function FullBlockWhite({ icon, title, subtitle, text, buttons }) {
  return (
    <div className="flex flex-col px-8 py-16 space-y-12 text-center bg-white">
      <div className="container flex flex-col mx-auto space-y-8">
        {icon}
        <h2 className="max-w-3xl mx-auto text-3xl font-bold sm:text-5xl">
          {title}
        </h2>
        <h3 className="text-2xl font-light">{subtitle}</h3>
        <h3 className="max-w-4xl mx-auto font-light text-gray-700 sm:text-xl">
          {text}
        </h3>
        <div className="flex self-center space-x-4 sm:space-x-8">{buttons}</div>
      </div>
    </div>
  );
}
