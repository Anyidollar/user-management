import request from "supertest";
import app from "../app";
import Post from "../models/Post";
import { database } from "../config/database";

describe("deletePost", () => {
  let postId: string;

  beforeAll(async () => {
    await database.sync({ force: true });

    // Create a post for testing
    const post = await Post.create({
      id: "test-post-id",
      userId: "test-user-id",
      title: "Test Post",
      body: "This is a test post",
    });
    postId = post.id;
  });

  afterAll(async () => {
    // Clean up the database
    await Post.destroy({ where: {} });
    await database.close();
  });

  it("should delete an existing post", async () => {
    const response = await request(app).delete(`/api/delete-posts/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Post deleted successfully");

    // Verify the post is deleted
    const deletedPost = await Post.findByPk(postId);
    expect(deletedPost).toBeNull();
  });

  it("should return 404 if the post does not exist", async () => {
    const nonExistentPostId = "non-existent-post-id";
    const response = await request(app).delete(
      `/api/delete-posts/${nonExistentPostId}`
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Post not found");
  });
});
