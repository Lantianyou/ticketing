import { Message } from "node-nats-streaming";
import { Listener, TicketCreatedEvent, Subjects } from "@lanxtianyou/common";

export class TicketCreateListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    console.log(data.id);
    console.log(data.price);
    console.log(data.title);
    msg.ack();
  }
}
