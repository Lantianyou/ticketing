import { GetServerSideProps } from "next";
import axios from "axios";

const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: context.req.headers,
  });

  const { data: orders } = await client.get("/api/orders");
  return {
    props: {
      orders,
    },
  };
};

export default OrderIndex;
