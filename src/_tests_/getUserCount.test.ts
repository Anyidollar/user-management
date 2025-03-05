import request from "supertest";
import app from "../app";
import User from "../models/User";
import { database } from "../config/database";

describe("getUserCount", () => {
  beforeAll(async () => {
    await database.sync({ force: true });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await database.close();
  });

  it("should retrieve the count of users when users exist", async () => {
    await User.bulkCreate([
      {
        id: "user-1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
      },
      {
        id: "user-2",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: "password123",
      },
    ]);

    const response = await request(app).get("/api/user-count");

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User count retrieved successfully");
    expect(response.body.data).toBe(2);
  });

  it("should retrieve the count of users when no users exist", async () => {
    await User.destroy({ where: {} });

    const response = await request(app).get("/api/user-count");

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User count retrieved successfully");
    expect(response.body.data).toBe(0);
  });
});
