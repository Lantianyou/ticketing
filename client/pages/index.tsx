import { GetServerSideProps } from "next";
const Index = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const res = await fetch("https://ticketing.dev/api/users/currentuser");
//   const data = res.json();
//   console.log(data);
//   return { props: {} };
// };

export default Index;
