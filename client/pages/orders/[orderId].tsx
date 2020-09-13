import { useEffect, useState } from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import StripeCheckout from "react-stripe-checkout";
import BuildClient from "../../api/build-client";
import useRequest from "../../hooks/useRequest";

type Props = {
  order: {
    id: string;
    expiresAt: string;
    ticket: {
      price: number;
    };
  };
  currentUser: {
    email: string;
  };
};

const OrderShow = ({ order }: Props) => {
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
    return <div>Order expired</div>;
  }

  return (
    <div>
      Order {timeLeft}秒后过期
      <StripeCheckout
        token={({ id }) => console.log(id)}
        stripeKey="pk_test_iYmPFYs3w5jTwXvbLEfGXHkr00s4iCVOcE"
        amount={order.ticket.price * 100}
      />
      {errors}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.query;
  const client = BuildClient(context);
  const { data: order } = await client.get(`/api/orders/${orderId}`);
  const { data: currentUser } = await client.get(`/api/users/currentUser`);

  return {
    props: {
      order,
      currentUser,
    },
  };
};

export default OrderShow;
