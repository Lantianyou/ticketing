import { GetServerSideProps } from "next";
import Router from "next/router";
import BuildClient from "../../api/build-client";
import useRequest from "../../hooks/useRequest";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
      {errors}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = BuildClient(context);
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return {
    props: {
      ticket: data,
    },
  };
};

export default TicketShow;
