import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@lanxtianyou/common";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setUp = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create a fake data event
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "tenet",
    price: 42,
  });
  await ticket.save();

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: ticket.title,
    price: 42,
    userId: "userid",
  };
  // create a fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { ticket, data, msg, listener };
};

it("finds, updates, and saves a ticket", async () => {
  const { ticket, data, msg, listener } = await setUp();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { data, msg, listener } = await setUp();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack() if the event skipped the version number", async () => {
  const { data, msg, listener } = await setUp();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
