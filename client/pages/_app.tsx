import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Header from "../components/header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
