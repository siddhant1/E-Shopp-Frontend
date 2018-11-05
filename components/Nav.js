import Link from "next/link";
const Nav = props => (
  <div>
    <Link href="/sell">
      <a>SellPage</a>
    </Link>
    <Link href="/">
      <a>Index Page</a>
    </Link>
  </div>
);

export default Nav;
