import { Publisher, Subjects, TicketUpdatedEvent } from "@lanxtianyou/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
