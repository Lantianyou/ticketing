import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("fetches the order", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 60,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  // make request to fetch the order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns error if user not authorized", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 60,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  // make request to fetch the order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
