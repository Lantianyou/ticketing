import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import BuildClient from "../../api/build-client";

const OrderShow = ({ order }: { order: { expiresAt: string } }) => {
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    setInterval(findTimeLeft, 1000);
  }, []);

  return <div>Order {msLeft / 1000}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.query;
  const client = BuildClient(context);
  const { data } = await client.get(`/api/orders/${orderId}`);

  return {
    props: { order: data },
  };
};

export default OrderShow;
