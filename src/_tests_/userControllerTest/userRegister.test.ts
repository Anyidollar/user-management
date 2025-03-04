import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import { database } from "../../config/database";

describe("userRegister", () => {
  beforeAll(async () => {
    await database.sync({ force: true });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await database.close();
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/api/register").send({
      firstName: "Ifeanyi",
      lastName: "Okoro",
      email: "ifeanyiokoro123@gmail.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User registration successful");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.email).toBe("ifeanyiokoro123@gmail.com");
    expect(response.body.data.firstName).toBe("Ifeanyi");
    expect(response.body.data.lastName).toBe("Okoro");
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/register").send({
      firstName: "Ifeanyi",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "All fields (lastName, firstName, email, password) are required."
    );
  });

  it("should return 409 if the email is already registered", async () => {
    await User.create({
      id: "test-user-id",
      firstName: "Ifeanyi",
      lastName: "Okoro",
      email: "ifeanyiokoro123@gmail.com",
      password: "hashedPassword",
    });

    const response = await request(app).post("/api/register").send({
      firstName: "Ifeanyi",
      lastName: "Okoro",
      email: "ifeanyiokoro123@gmail.com",
      password: "password123",
    });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "User with email jane.doe@example.com already exists."
    );
  });
});
