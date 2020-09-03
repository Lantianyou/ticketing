import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { newTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { errorHandler, NotFoundError, currentUser } from "@lanxtianyou/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(newTicketRouter);
app.use(showTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
