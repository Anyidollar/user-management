import express from "express";
import { createPost } from "../controllers/postController/createPost";
import { getUserPosts } from "../controllers/postController/getUserPosts";
import { deletePost } from "../controllers/postController/deletePost";

const postRoutes = express.Router();

postRoutes.post("/posts", createPost);
postRoutes.delete("/delete-posts/:id", deletePost);
postRoutes.get("/get-posts", getUserPosts);

export default postRoutes;
