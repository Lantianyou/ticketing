import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custome-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ messgae: "Something went wrong" }],
  });
};

export default errorHandler;
