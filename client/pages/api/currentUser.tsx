import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

function buildClient(req) {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
}

const currentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = buildClient(req);
  // const data = await client.get("/api/auth/currentUser");
  return res.status(200).json({ name: "John Doe" });
};

export default currentUser;
