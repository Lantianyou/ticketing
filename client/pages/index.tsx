import { GetServerSideProps } from "next";
import buildClient from "../api/build-client";

const Index = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return {
    props: {
      data,
    },
  };
};

export default Index;
