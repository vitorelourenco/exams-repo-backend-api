import "../../src/setup";
import "../jestNamespace";

import supertest from "supertest";
import { getConnection } from "typeorm";

import { init } from "../../src/app";
import app from "../../src/app";

import toMatchSchema from "../schemas/toMatchSchema";

import { clearDatabase, fillDatabase } from "../utils/database";
import { ReceivedExam } from "../../src/protocols/CreateExam";

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

describe("POST /exams", () => {
  beforeEach(async () => {
    await clearDatabase();
    await fillDatabase();
  });

  it("should respond with status 201 when successful", async () => {
    const exam:ReceivedExam = {name:"test", degreeId:1, categoryId:1, instructorId:1, fileLink:"https://www.youtube.com/", courseId:1}
    const response = await agent.post("/exams").send(exam);
    expect(response.status).toBe(201);
  });

  it("should respond with status 400 for invalid params", async () => {
    const exam = {name:"", degreeId:"", categoryId:"", instructorId:"", fileLink:"", courseId:""}
    const response = await agent.post("/exams").send(exam);
    expect(response.status).toBe(400);
  });

});
