import supertest from "supertest";
import { getConnection } from "typeorm";
import app, {init} from "../../src/app";

beforeAll(async ()=>{
  await init();
});

afterAll(async()=>{
  await getConnection().close();
})

describe("GET /degrees", () => {
  it("should answer with text \"OK!\" and status 200", async () => {
    const response = await supertest(app).get("/test");
    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
  });
});
