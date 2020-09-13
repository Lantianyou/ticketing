import axios from "axios";
import { GetServerSideProps } from "next";
import Header from "../components/header";

const AuthWrapper = ({ currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
    </div>
  );
};



export default AuthWrapper;
