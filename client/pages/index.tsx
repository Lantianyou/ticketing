import { GetStaticProps } from "next";
import axios from "axios";

const Index = () => {
  return <h1>hi</h1>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );
  } else {
    const { data } = await axios.get("/api/users/currentuser");

    return {
      props: {
        data,
      },
    };
  }
};

export default Index;
