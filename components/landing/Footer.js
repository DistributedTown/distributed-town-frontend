import Link from 'next/link';
import Logo from '../Logo';

export default function Footer({ sections }) {
  return (
    <div className="bg-white">
      <div className="container flex flex-col gap-8 p-8 mx-auto">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <Link href="/landing">
            <a>
              <Logo />
            </a>
          </Link>
          {/* Footer nav */}
          <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-16">
            {sections.map(section => (
              <div key={section.name}>
                <div className="mb-2 text-2xl">{section.name}</div>
                <ul className="flex flex-col gap-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href}>
                        <a className="text-lg text-gray-600">{link.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <span className="sm:text-center">© 2021 DiTo.</span>
          <div className="flex flex-col gap-1 text-gray-500 sm:flex-row sm:justify-center sm:gap-4">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
