import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@lanxtianyou/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("需要标题"),
    body("price").isFloat({ gt: 0 }).withMessage("价格必须大于0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      id: mongoose.Types.ObjectId().toHexString(),
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as newTicketRouter };
