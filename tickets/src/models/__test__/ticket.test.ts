import mongoose from "mongoose";
import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async (done) => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "title",
    price: 5,
    userId: "123",
  });

  // save the ticket
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make 2 seperate changes to tickets we fetched
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 10 });

  // save the 1st fetched ticket
  await firstInstance?.save();
  // save the 2nd fetched ticket expect an error
  try {
    await secondInstance?.save();
  } catch (err) {
    return done();
  }

  throw new Error("should not reach line 31");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "tenet",
    price: 42,
    userId: "abc",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
