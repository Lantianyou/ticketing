import { Publisher, OrderCreatedEvent, Subjects } from "@lanxtianyou/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
