import { Publisher, TicketCreatedEvent, Subjects } from "@lanxtianyou/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
