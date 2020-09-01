import request from "supertest";
import { app } from "../../app";
import { response } from "express";

it("fails when email not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(400);
});

it("fails when wrong password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@email.com",
      password: "dajndjkan",
    })
    .expect(400);
});

it("fails when wrong password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
