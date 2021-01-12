import Link from 'next/link';
import {
  FaArrowDown,
  FaBuilding,
  FaDiscord,
  FaGithub,
  FaLink,
  FaPalette,
} from 'react-icons/fa';
import Button from '../components/Button';
import Logo from '../components/Logo';

export default function Landing() {
  return (
    <div className="w-full flex flex-col gap-8 md:gap-16">
      <div className="flex flex-col">
        <Header />
        <HeroSection />
      </div>
      <Features />
      <div className="bg-denim text-white text-center py-16 px-8 flex flex-col gap-12">
        <div className="container mx-auto">
          <h2 className="font-bold text-3xl sm:text-5xl">
            Sint minus doloribus commodi?
            <br />
            Odio, cumque, cupiditate.
          </h2>
          <h3 className="font-light sm:text-xl">
            Cupiditate quis sequi excepturi est maiores fugiat suscipit culpa
            consequatur atque necessitatibus, nemo voluptatum, enim iure
            repellat?
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="container p-8 mx-auto flex flex-col justify-between sm:flex-row sm:items-center">
      <Link href="/landing">
        <a>
          <Logo className="mx-auto sm:mx-0" />
        </a>
      </Link>
      <Link href="/">
        <Button className="hidden sm:block">Open App</Button>
      </Link>
    </div>
  );
}

function HeroSection() {
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

function Features() {
  const features = [
    {
      icon: FaLink,
      title: 'Web3 & Blockchain',
      text: 'For small, functional Web3 teams',
      details: (
        <ul className="list-disc list-inside">
          <li>keep accounting & run proposals</li>
          <li>fair, milestone-based rewards & payments to members</li>
          <li>efficiently distribute tasks</li>
          <li>get initial fundings for their projects</li>
          <li>coordinate for hackathons & sprints</li>
        </ul>
      ),
    },
    {
      icon: FaPalette,
      title: 'Art & Lifestyle',
      text: 'For artists & creative minds',
      details: (
        <ul className="list-disc list-inside">
          <li>keep accounting & run proposals</li>
          <li>manage multi-disciplinary projects & distribute tasks</li>
          <li>distribute shares & royalties fairly</li>
          <li>maintain continuous funding flow</li>
          <li>update scores & rank while gaming</li>
        </ul>
      ),
    },
    {
      icon: FaBuilding,
      title: 'Local Community',
      text: 'For neighbors, condos & small local clubs',
      details: (
        <ul className="list-disc list-inside">
          <li>hold a common treasury</li>
          <li>vote for local proposals based on reputation & commitment</li>
          <li>share & track common resources</li>
          <li>organize & fund local projects</li>
          <li>divide tasks for mutual support</li>
        </ul>
      ),
    },
  ];
  return (
    <div className="container mx-auto flex flex-col md:grid md:grid-cols-3 flex-wrap justify-center gap-4 p-4">
      <h1 className="text-center text-3xl sm:text-5xl mb-8 w-full md:col-span-3">
        Three community types to choose from
      </h1>
      {features.map(feature => (
        <div className="flex flex-col gap-2 bg-white rounded-2xl p-8">
          <feature.icon size="4rem" className="text-denim mb-6 self-center" />
          <h2 className="text-2xl text-center">{feature.title}</h2>
          <p className="text-xl text-center text-gray-600">{feature.text}</p>
          {/* <p className="text-gray-600 font-light self-center">
            {feature.details}
          </p> */}
        </div>
      ))}
    </div>
  );
}

function Footer() {
  const sections = [
    {
      name: 'Product',
      links: [
        { title: 'Blog', href: '#' },
        { title: 'FAQs', href: '#' },
      ],
    },
    {
      name: 'Community',
      links: [
        {
          title: (
            <span className="flex flex-row items-center gap-2">
              <FaDiscord />
              Discord
            </span>
          ),
          href: '#',
        },
        {
          title: (
            <span className="flex flex-row items-center gap-2">
              <FaGithub />
              Github
            </span>
          ),
          href: 'https://github.com/DistributedTown',
        },
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-8 sm:flex-row justify-between">
          <Link href="/landing">
            <a>
              <Logo />
            </a>
          </Link>
          {/* Footer nav */}
          <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-16">
            {sections.map(section => (
              <div>
                <div className="text-2xl mb-2">{section.name}</div>
                <ul className="flex flex-col gap-1">
                  {section.links.map(link => (
                    <li>
                      <a className="text-lg text-gray-600" href={link.href}>
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <span className="sm:text-center">© 2021 DiTo.</span>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-4 text-gray-500">
            <a>Terms & Conditions</a>
            <a>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
