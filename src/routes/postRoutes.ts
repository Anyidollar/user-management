import express from "express";
import { createPost } from "../controllers/postController/createPost";
import { getUserPosts } from "../controllers/postController/getUserPosts";

const postRoutes = express.Router();

postRoutes.post("/posts", createPost);
postRoutes.get("/get-posts", getUserPosts);

export default postRoutes;
