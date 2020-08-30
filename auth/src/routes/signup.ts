import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("请输入正确的email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("密码长度必须在4到20个字符之间"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    console.log("Creating a user");
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
