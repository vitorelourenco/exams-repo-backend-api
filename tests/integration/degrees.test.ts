import "../../src/setup";
import "../jestNamespace";

import supertest from "supertest";
import { getConnection } from "typeorm";

import { init } from "../../src/app";
import app from "../../src/app";

import Degree from "../../src/entities/Degree";

import toMatchSchema from "../schemas/toMatchSchema";
import { degreesArr,degreeDrive } from "../schemas/degrees";

import { FakeDegree } from "../factories/degreeFactory";

import { clearDatabase, fillDatabase } from "../utils/database";
import {getSalt} from "../../src/utils/database";

beforeAll(async () => {
  await init();
  await clearDatabase();
  await fillDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await fillDatabase();
  await getConnection().close();
});
expect.extend({ toMatchSchema });
const agent = supertest(app);

describe("GET /degrees", () => {
  beforeAll(async () => {
    await clearDatabase();
    await fillDatabase();
  });

  it("should respond with status 200", async () => {
    const response = await agent.get("/degrees");
    expect(response.status).toBe(200);
  });

  it("should respond with an array of degrees", async () => {
    const response = await agent.get("/degrees");
    expect(response.body).toMatchSchema(degreesArr);
  });
});

describe("GET /degrees/drive/:degreeId", () => {
  beforeAll(async () => {
    await clearDatabase();
    await fillDatabase();
  });

  it("should respond with status 200", async () => {
    const response = await agent.get("/degrees/drive/1");
    expect(response.status).toBe(200);
  });

  it("should respond with a degree drive object", async () => {
    const response = await agent.get("/degrees");
    expect(response.body).toMatchSchema(degreeDrive);
  });
});

describe("POST /degress", () => {
  beforeEach(async () => await clearDatabase());

  it("should respond with status 201 when successful", async () => {
    const salt = await getSalt(Degree);
    const degree = new FakeDegree({ salt });
    const response = await agent.post("/degrees").send(degree);
    expect(response.status).toBe(201);
  });

  it("should respond with status 400 for invalid params", async () => {
    const degree = new FakeDegree({ name: "" });
    const response = await agent.post("/degrees").send(degree);
    expect(response.status).toBe(400);
  });

  it("should respond with status 409 when name is already in DB", async () => {
    const degree = new FakeDegree({ name: "a" });
    await agent.post("/degrees").send(degree);
    const response = await agent.post("/degrees").send(degree);
    expect(response.status).toBe(409);
  });
});
