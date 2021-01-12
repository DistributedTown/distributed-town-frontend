import Link from 'next/link';
import Button from '../Button';
import Logo from '../Logo';

export default function Header({ links = [] }) {
  return (
    <div className="container flex flex-col justify-between p-8 mx-auto text-lg sm:flex-row sm:items-center">
      <Link href="/landing">
        <a>
          <Logo className="mx-auto sm:mx-0" />
        </a>
      </Link>
      <div className="hidden sm:flex sm:gap-12 sm:items-center">
        {links.map(l => (
          <Link href={l.href}>
            <a className="font-bold text-gray-600">{l.title}</a>
          </Link>
        ))}
        <Link href="/">
          <Button>Open App</Button>
        </Link>
      </div>
    </div>
  );
}
