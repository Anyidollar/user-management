import request from "supertest";
import app from "../app";
import User from "../models/User";
import Address from "../models/Address";
import { database } from "../config/database";

describe("getUserById", () => {
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

    await Address.create({
      userId: user.id,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    });
  });

  afterAll(async () => {
    await Address.destroy({ where: {} });
    await User.destroy({ where: {} });
    await database.close();
  });

  it("should retrieve a user by ID with their address", async () => {
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User retrieved successfully");

    expect(response.body.data.id).toBe(userId);
    expect(response.body.data.firstName).toBe("John");
    expect(response.body.data.lastName).toBe("Doe");
    expect(response.body.data.email).toBe("john.doe@example.com");

    const address = await Address.findOne({ where: { userId } });

    expect(response.body.data.address).toEqual({
      id: address?.id,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    });
  });

  it("should return 404 if the user does not exist", async () => {
    const nonExistentUserId = "non-existent-user-id";
    const response = await request(app).get(`/api/users/${nonExistentUserId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User not found");
  });
});
