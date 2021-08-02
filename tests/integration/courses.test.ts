import "../../src/setup";
import "../jestNamespace";

import supertest from "supertest";
import { getConnection } from "typeorm";

import { init } from "../../src/app";
import app from "../../src/app";

import toMatchSchema from "../schemas/toMatchSchema";

import { clearDatabase, fillDatabase } from "../utils/database";

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

describe("GET /courses/:degreeId/byPeriod", () => {
  const BASE_ROUTE = "/courses"

  beforeEach(async () => {
    await clearDatabase();
    await fillDatabase();
  });

  it("should respond with status 200", async () => {
    const response = await agent.get("/courses/1/byPeriod");
    expect(response.status).toBe(200);
  });
});

