import request from "supertest";
import app from "../app";
import User from "../models/User";
import Address from "../models/Address";
import { database } from "../config/database";

describe("updateAddress", () => {
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

  it("should update the address for a user", async () => {
    const response = await request(app)
      .patch(`/api/update-address/${userId}`)
      .send({
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
      });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Address updated successfully");
    expect(response.body.data.userId).toBe(userId);
    expect(response.body.data.street).toBe("456 Elm St");
    expect(response.body.data.city).toBe("Los Angeles");
    expect(response.body.data.state).toBe("CA");
    expect(response.body.data.zipCode).toBe("90001");
  });

  it("should return 404 if the user does not exist", async () => {
    const nonExistentUserId = "non-existent-user-id";
    const response = await request(app)
      .patch(`/api/update-address/${nonExistentUserId}`)
      .send({
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
      });

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

    const response = await request(app)
      .patch(`/api/update-address/${userWithoutAddress}`) 
      .send({
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Address not found for this user");
  });
});
