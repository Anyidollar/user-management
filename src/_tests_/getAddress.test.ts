import request from "supertest";
import app from "../app";
import User from "../models/User";
import Address from "../models/Address";
import { database } from "../config/database";

describe("getAddress", () => {
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
      id: "test-address-id",
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

  it("should retrieve the address for a user", async () => {
    const response = await request(app).get(`/api/get-address/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Address retrieved successfully");
    expect(response.body.data.userId).toBe(userId);
    expect(response.body.data.street).toBe("123 Main St");
    expect(response.body.data.city).toBe("New York");
    expect(response.body.data.state).toBe("NY");
    expect(response.body.data.zipCode).toBe("10001");
  });

  it("should return 404 if the user does not exist", async () => {
    const nonExistentUserId = "non-existent-user-id";
    const response = await request(app).get(
      `/api/get-address/${nonExistentUserId}`
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User not found");
  });

  it("should return 404 if the user does not have an address", async () => {
    const userWithoutAddress = await User.create({
      id: "user-without-address-id",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "password123",
    });

    const response = await request(app).get(
      `/api/get-address/${userWithoutAddress.id}`
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Address not found for this user");
  });
});
