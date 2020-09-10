import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import buildClient from "../api/build-client";
import Header from "../components/header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  let currentUser = pageProps ? pageProps.currentUser : null;
  return (
    <>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
