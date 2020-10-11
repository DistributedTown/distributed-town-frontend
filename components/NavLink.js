import Link from "next/link";

function NavLink(props) {
  return (
    <li>
      <Link href={props.href}>
        <a className="">{props.children}</a>
      </Link>
    </li>
  );
}

export default NavLink;
