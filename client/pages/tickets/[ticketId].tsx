import { GetServerSideProps } from "next";
import currentUser from "../api/currentUser";

const TicketShow = ({ ticket }) => {
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ticketId } = context.query;
  const { req, res } = context;
  const { data } = await currentUser(req, res);

  return {
    props: {
      ticket: data,
    },
  };
};

export default TicketShow;
