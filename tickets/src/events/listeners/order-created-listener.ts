import { Listener, OrderCreatedEvent, Subjects } from "@lanxtianyou/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGrouName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName = queueGrouName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ticket the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // no ticket error

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // mark ticket as reserved by setting its orderId

    ticket.set({ orderId: data.id });

    // save ticket
    await ticket.save();
    // ack()

    msg.ack();
  }
}
