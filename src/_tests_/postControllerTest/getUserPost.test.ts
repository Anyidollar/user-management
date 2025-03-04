import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import Post from "../../models/Post";
import { database } from "../../config/database";

describe("getUserPosts", () => {
  let userId: string;

  beforeAll(async () => {
    // Sync the database models
    await database.sync({ force: true });

    // Create a user and some posts for testing
    const user = await User.create({
      id: "test-user-id",
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "password",
    });
    userId = user.id;

    await Post.bulkCreate([
      {
        id: "post-1",
        userId,
        title: "Post 1",
        body: "This is post 1",
      },
      {
        id: "post-2",
        userId,
        title: "Post 2",
        body: "This is post 2",
      },
    ]);
  });

  afterAll(async () => {
    // Clean up the database
    await Post.destroy({ where: {} });
    await User.destroy({ where: {} });
    await database.close(); // Close the database connection
  });

  it("should retrieve posts for a given user", async () => {
    const response = await request(app).get("/api/get-posts").query({ userId });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User posts retrieved successfully");
    expect(response.body.data.length).toBe(2); // Expect 2 posts
    expect(response.body.data[0].title).toBe("Post 1");
    expect(response.body.data[1].title).toBe("Post 2");
  });

  it("should return 400 if userId is missing", async () => {
    const response = await request(app).get("/api/get-posts").query({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "userId is required as a query parameter"
    );
  });

  it("should return 404 if user does not exist", async () => {
    const response = await request(app)
      .get("/api/get-posts")
      .query({ userId: "non-existent-user-id" });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User not found");
  });
});
