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

const app = express();
dotenv.config();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Beautiful World");
});

app.use("/api", indexRoutes);
app.use(errorHandler);

database
  .sync({})
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//Graceful shutdown
const gracefulShutdown = async () => {
  console.log("\n🔄 Initiating graceful shutdown...");

  try {
    await database.close();
    console.log("Database connection closed");

    //server closed successfully
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

export default app;
