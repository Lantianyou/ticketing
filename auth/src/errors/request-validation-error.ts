import { ValidationError } from "express-validator";
import { CustomError } from "./custome-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super("Invalid request parameters");

    // Extends a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
