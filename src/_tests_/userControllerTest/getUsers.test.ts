import request from "supertest";
import app from "../../app"; // Adjust the path to your app
import User from "../../models/User"; // Ensure this path is correct
import { database } from "../../config/database"; // Import the database instance

describe("getUsers", () => {
  beforeAll(async () => {
    // Sync the database models
    await database.sync({ force: true });

    // Create some users for testing
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
      {
        id: "user-3",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        password: "password123",
      },
    ]);
  });

  afterAll(async () => {
    // Clean up the database
    await User.destroy({ where: {} });
    await database.close(); // Close the database connection
  });

  it("should retrieve users with valid pagination parameters", async () => {
    const response = await request(app)
      .get("/api/get-users")
      .query({ pageNumber: 0, pageSize: 2 });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Users retrieved successfully");
    expect(response.body.totalUsers).toBe(3);
    expect(response.body.currentPage).toBe(0);
    expect(response.body.pageSize).toBe(2);
    expect(response.body.totalPages).toBe(2);
    expect(response.body.data.length).toBe(2);
    expect(response.body.data[0].email).toBe("alice.smith@example.com");
    expect(response.body.data[1].email).toBe("jane.doe@example.com");
  });

  it("should return 400 for invalid pagination parameters", async () => {
    const response = await request(app)
      .get("/api/get-users")
      .query({ pageNumber: -1, pageSize: 0 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "Invalid pagination parameters. pageNumber must be >= 0, pageSize must be > 0."
    );
  });

  it("should return an empty list if no users exist", async () => {
    await User.destroy({ where: {} });

    const response = await request(app)
      .get("/api/get-users")
      .query({ pageNumber: 0, pageSize: 10 });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Users retrieved successfully");
    expect(response.body.totalUsers).toBe(0);
    expect(response.body.currentPage).toBe(0);
    expect(response.body.pageSize).toBe(10);
    expect(response.body.totalPages).toBe(0);
    expect(response.body.data.length).toBe(0);
  });
});
