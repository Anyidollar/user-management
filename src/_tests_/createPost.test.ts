import request from "supertest";
import app from "../app";
import User from "../models/User";
import Post from "../models/Post";
import { database } from "../config/database";

describe("createPost", () => {
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
    await Post.destroy({ where: {} });
    await User.destroy({ where: {} });
    await database.close();
  });

  it("should create a new post", async () => {
    const response = await request(app).post("/api/posts").send({
      title: "Test Post",
      body: "This is a test post",
      userId,
    });

    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Post created successfully");
    expect(response.body.data.title).toBe("Test Post");
    expect(response.body.data.body).toBe("This is a test post");
    expect(response.body.data.userId).toBe(userId);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/posts").send({
      title: "Test Post",
    });


    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "All fields (title, body, userId) are required"
    );
  });
});
