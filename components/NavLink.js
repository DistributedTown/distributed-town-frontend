import Link from "next/link";

function NavLink(props) {
  return (
    <li>
      <Link href={props.href}>
        <a className="px-2 py-8">{props.children}</a>
      </Link>
    </li>
  );
}

export default NavLink;
