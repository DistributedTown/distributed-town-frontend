import Link from 'next/link';
import Button from '../Button';
import Logo from '../Logo';

export default function Header() {
  return (
    <div className="container flex flex-col justify-between p-8 mx-auto sm:flex-row sm:items-center">
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
