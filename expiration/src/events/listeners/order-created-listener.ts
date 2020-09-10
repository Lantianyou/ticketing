import { Listener, OrderCreatedEvent, Subjects } from "@lanxtianyou/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subjects: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedListener["data"], msg: Message) {}
}
