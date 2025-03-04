import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { HttpError } from "http-errors";
import indexRoutes from "./routes/indexRoutes";
import { database } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import http from "http";

const app = express();
dotenv.config();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello Beautiful World" });
});

app.use("/api", indexRoutes);
app.use(errorHandler);

// Database connection
database
  .sync({})
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Database is connected successfully");
    }
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

// Start the server only if not in test environment
let server: http.Server; // Explicitly type the server variable
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Graceful shutdown
  const gracefulShutdown = async () => {
    console.log("\n🔄 Initiating graceful shutdown...");

    try {
      await database.close();
      console.log("Database connection closed");

      // Server closed successfully
      server.close(() => {
        console.log("Server stopped listening for requests");
        process.exit(0);
      });
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  };

  // Handle termination signals
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}

export default app;
