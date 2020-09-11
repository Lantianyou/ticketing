import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { TicketCreatedEvent } from "@lanxtianyou/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";
import { Ticket } from "../../../models/ticket";

const setUp = async () => {
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "tenet",
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // create a fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a ticket", async () => {
  const { listener, data, msg } = await setUp();
  // call the onMessage with data object + message object
  await listener.onMessage(data, msg);
  // expect ticket created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);
});

it("message acks", async () => {
  const { data, listener, msg } = await setUp();
  // call the onMessage with data object + message object
  await listener.onMessage(data, msg);
  // ack() called
  // write assertions
  expect(msg.ack).toHaveBeenCalled();
});
