import { useEffect } from "react";
import { Router } from "next/router";
import useRequest from "../../hooks/useRequest";

const SignOut = () => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "POST",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);
};

export default SignOut;
