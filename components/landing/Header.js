import Link from 'next/link';
import Button from '../Button';
import Logo from '../Logo';

export default function Header() {
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
