import Link from 'next/link';
import Button from '../Button';

export default function Features({ title, features, ctaText, ctaHref }) {
  return (
    <div className="container flex flex-col p-4 mx-auto space-y-4">
      <h1 className="w-full mb-8 text-3xl text-center sm:text-5xl md:col-span-3">
        {title}
      </h1>
      <div className="flex flex-col p-4 mx-auto space-y-4 md:space-x-4 md:space-y-0 md:grid md:grid-cols-3">
        {features.map(feature => (
          <div
            key={feature.title}
            className="flex flex-col justify-between p-8 space-y-2 bg-white rounded-2xl"
          >
            <feature.icon size="4rem" className="self-center mb-6 text-denim" />
            <h2 className="text-2xl text-center">{feature.title}</h2>
            <p className="text-xl text-center text-gray-600">{feature.text}</p>
            <p className="self-center font-light text-gray-600">
              {feature.details}
            </p>
          </div>
        ))}
      </div>
      <Link href={ctaHref}>
        <Button className="mx-auto" filled>
          {ctaText}
        </Button>
      </Link>
    </div>
  );
}
