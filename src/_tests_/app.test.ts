import request from "supertest";
import app from "../app";

describe("API Tests", () => {
  it("should return Hello, Beautiful World!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello, Beautiful World");
  });
});
