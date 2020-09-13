import mongoose from "mongoose";
import { app } from "./app";

// 没有顶级await，start作为wrapper
const PORT = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("No mongo url");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("已连接MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`auth服务已启动，监听于端口${PORT}`);
  });
};

start();
