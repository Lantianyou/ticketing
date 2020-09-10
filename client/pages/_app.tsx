import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import buildClient from "../api/build-client";
import Header from "../components/header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log(pageProps);
  let currentUser = pageProps ? pageProps.currentUser : null;
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (appContext) => {
  const client = buildClient(appContext);
  const { data } = await client.get("/api/users/currentuser");
  console.log(data);

  let pageProps = {};

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
