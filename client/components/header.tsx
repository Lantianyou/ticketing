import Link from "next/link";
import { GetServerSideProps } from "next";
import BuildClient from "../api/build-client";

const Header = () => {
  let currentUser = undefined;
  const links = [
    !currentUser && { label: "注册", href: "/auth/signup" },
    !currentUser && { label: "登陆", href: "/auth/signin" },
    currentUser && { label: "注销", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a href="" className="navbar-brand">
          GitTix
        </a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = BuildClient(context);
  console.log("!!!");
  const { currentUser } = await client.get("/api/currentUser");
  console.log(currentUser);
  return {
    props: { currentUser },
  };
};

export default Header;
