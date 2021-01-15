import Link from 'next/link';
import Logo from '../Logo';

export default function Footer({ sections }) {
  return (
    <div className="bg-white">
      <div className="container flex flex-col p-8 mx-auto space-y-8">
        <div className="flex flex-col justify-between space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          {/* Footer nav */}
          <nav className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-16">
            {sections.map(section => (
              <div key={section.name}>
                <div className="mb-2 text-2xl">{section.name}</div>
                <ul className="flex flex-col space-y-1">
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
        <div className="flex flex-col justify-between space-y-4">
          <span className="sm:text-center">© 2021 DiTo.</span>
          <div className="flex flex-col space-y-1 text-gray-500 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
