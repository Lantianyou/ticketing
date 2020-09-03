import request from "supertest";
import { app } from "../../app";

it("has a route handler", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("only user signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("returns other than 401 if user not signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(401);
});
it("returns error if invalid title", async () => {});

it("returns error if invalid price", async () => {});

it("creates a ticket with valid params", async () => {});
