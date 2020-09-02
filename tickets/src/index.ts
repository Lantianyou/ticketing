import mongoose from "mongoose";
import { app } from "./app";

// 没有顶级await
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongo");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("listening in port 3000");
  });
};

start();
