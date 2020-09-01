import request from "supertest";
import { app } from "../../app";
import { Password } from "../../services/password";

it("returs 201 on signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);
});

it("returns 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testdada",
      password: "password",
    })
    .expect(400);
});

it("returns 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testdada@email.com",
      password: "p",
    })
    .expect(400);
});

it("returns 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "password",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "t@email.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "t@email.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after signup", async () => {
  // secure:true 必须要HTTPS
  // supertest 是HTT P
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
