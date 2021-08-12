import "../jestNamespace";

import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";

import { init } from "../../src/app";
import app from "../../src/app";

import toMatchSchema from "../schemas/toMatchSchema";

import { clearDatabase, fillDatabase } from "../utils/database";
import { ReceivedExam } from "../../src/protocols/CreateExam";
import { examsByCategorySchema } from "../schemas/exams";

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

  it("should respond with status 404 when param is not found", async () => {
    const exam:ReceivedExam = {name:"test", degreeId:2147483647, categoryId:2147483647, instructorId:2147483647, fileLink:"https://www.youtube.com/", courseId:1}
    const response = await agent.post(`/exams`).send(exam);
    expect(response.status).toBe(404);
  });


});

describe("GET /exams/instructor/:instructorId/byCategory", () => {

  beforeEach(async () => {
    await clearDatabase();
    await fillDatabase();
  });

  it("should respond with status 200", async () => {
    const response = await agent.get(`/exams/instructor/1/byCategory`);
    expect(response.status).toBe(200);
  });

  it("should respond with status 404 when instructorId is not found", async () => {
    const response = await agent.get(`/exams/instructor/2147483647/byCategory`);
    expect(response.status).toBe(404);
  });

  it("should respond with an exams nested in categories object", async () => {
    const response = await agent.get(`/exams/course/1/byCategory`);
    expect(response.body).toMatchSchema(examsByCategorySchema);
  });
});

describe("GET /exams/course/:courseId/byCategory", () => {

  beforeEach(async () => {
    await clearDatabase();
    await fillDatabase();
  });

  it("should respond with status 200", async () => {
    const response = await agent.get(`/exams/course/1/byCategory`);
    expect(response.status).toBe(200);
  });

  it("should respond with status 404 when courseId is not found", async () => {
    const response = await agent.get(`/exams/course/2147483647/byCategory`);
    expect(response.status).toBe(404);
  });

  it("should respond with an exams nested in categories object", async () => {
    const response = await agent.get(`/exams/course/1/byCategory`);
    expect(response.body).toMatchSchema(examsByCategorySchema);
  });
  
});

