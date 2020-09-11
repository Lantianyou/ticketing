import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@lanxtianyou/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const event = { id: data.id, version: data.version - 1 };
    const ticket = await Ticket.findByEvent(event);

    if (!ticket) {
      throw new Error("ticket not found");
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
