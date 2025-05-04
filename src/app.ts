import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { routes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

// Create Express application
const app = express();

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Apply routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "EduCircle API is running" });
});

// Apply error handling middleware
app.use(errorMiddleware);

export { app };
