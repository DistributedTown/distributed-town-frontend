import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import Logo from '../Logo';

export default function Footer() {
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
