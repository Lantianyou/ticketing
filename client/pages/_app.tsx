import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default AppComponent;
