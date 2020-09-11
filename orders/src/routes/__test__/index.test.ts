import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "title",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  return ticket;
};

it("fetches orders for an particular user", async () => {
  // create 3 tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();
  // create one order as user 1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // create two orders as user 2

  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const { body: allBody } = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  expect(allBody.length).toEqual(2);
  expect(allBody[0].id).toEqual(orderOne.id);
  expect(allBody[1].id).toEqual(orderTwo.id);
  expect(allBody[0].ticket.id).toEqual(ticketTwo.id);
  expect(allBody[1].ticket.id).toEqual(ticketThree.id);
});
