import { Publisher, OrderCancelledEvent, Subjects } from "@lanxtianyou/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
