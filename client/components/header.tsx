import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";

const Header = ({ currentUser }: { currentUser? }) => {
  const links = [
    !currentUser && { label: "注册", href: "/auth/signup" },
    !currentUser && { label: "登陆", href: "/auth/signin" },
    currentUser && { label: "Sell", href: "/tickets/new" },
    currentUser && { label: "我的订单", href: "/orders" },
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
  const client = axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: context.req.headers,
  });

  const { data: currentUser } = await client.get(`/api/users/currentuser`);
  return {
    props: {
      currentUser,
    },
  };
};

export default Header;
