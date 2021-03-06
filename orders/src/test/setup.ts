import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock("../nats-wrapper.ts");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // JWT payload {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@email.com",
  };
  // create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build session Onject {jwt: ...}
  const session = { jwt: token };
  // JSON encode to base64
  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return string
  // {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTA1M2NhM2E2MDQ0MDAxODFiNzA2NSIsImVtYWlsIjoidGVzdDFAZW1haWwuY29tIiwiaWF0IjoxNTk5MDk5OTU2fQ.FEjsz5VOX2MIPWIu0eXdE_M0S5ge_MgaXNsiqfONR5I"}
  return [`express:sess=${base64}`];
};
