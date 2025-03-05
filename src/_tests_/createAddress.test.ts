import request from "supertest";
import app from "../app";
import User from "../models/User";
import Address from "../models/Address";
import { database } from "../config/database";

describe("createAddress", () => {
  let userId: string;

  beforeAll(async () => {
    await database.sync({ force: true });

    const user = await User.create({
      id: "test-user-id",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    userId = user.id;
  });

  afterAll(async () => {
    await Address.destroy({ where: {} });
    await User.destroy({ where: {} });
    await database.close();
  });

  it("should create an address for a user", async () => {
    const response = await request(app).post("/api/create-address").send({
      userId,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    });

    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Address created successfully");
    expect(response.body.data.userId).toBe(userId);
    expect(response.body.data.street).toBe("123 Main St");
    expect(response.body.data.city).toBe("New York");
    expect(response.body.data.state).toBe("NY");
    expect(response.body.data.zipCode).toBe("10001");
  });

  it("should return 404 if the user does not exist", async () => {
    const nonExistentUserId = "non-existent-user-id";
    const response = await request(app).post("/api/create-address").send({
      userId: nonExistentUserId,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User not found");
  });

  it("should return 400 if the user already has an address", async () => {
    await Address.create({
      id: "test-address-id",
      userId,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    });

    const response = await request(app).post("/api/create-address").send({
      userId,
      street: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User already has an address");
  });
});
