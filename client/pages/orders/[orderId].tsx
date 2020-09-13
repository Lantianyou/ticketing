import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_FlLFVapGHTly3FicMdTU06SC006tWtWbNH"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.query;

  const client = axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: context.req.headers,
  });

  const { data: order } = await client.get(`/api/orders/${orderId}`);
  return {
    props: {
      order,
    },
  };
};

export default OrderShow;
