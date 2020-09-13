import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";

const LandingPage = ({ tickets }) => {
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
  const client = axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: context.req.headers,
  });

  const { data: tickets } = await client.get("/api/tickets");
  return {
    props: {
      tickets,
    },
  };
};

export default LandingPage;
