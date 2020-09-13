import { GetServerSideProps } from "next";
import Link from "next/link";
import BuildClient from "../api/build-client";

const LandingPage = ({ tickets, currentUser }) => {
  console.log(currentUser);
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
          <a href="">view</a>
        </Link>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = BuildClient(context);
  const { data: tickets } = await client.get("/api/tickets");

  return {
    props: {
      tickets,
    },
  };
};

export default LandingPage;
