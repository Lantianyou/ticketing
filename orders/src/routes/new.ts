import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  BadRequestError,
} from "@lanxtianyou/common";
import { Ticket } from "../models/ticket";
import { Order, OrderStatus } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const FIFTEEN_MINUTES = 15 * 60;

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("必须有ticketId")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    // Ticket not reserved
    // 1. all orders
    // 2. based on *the ticket* find order
    // 3. order status not cancelled
    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket already reserved");
    }
    // expiration date
    const expirarion = new Date();
    expirarion.setSeconds(expirarion.getSeconds() + FIFTEEN_MINUTES);
    // Build the order, save it to db
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expirarion,
      ticket: ticket,
    });
    await order.save();
    // publish an event
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
