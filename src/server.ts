import dotenv from "dotenv";
import { app, prisma } from "./index";

// Load environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`EduCircle API server running on port ${PORT}`);
});

// Handle server shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  await server.close();
  await prisma.$disconnect();
  console.log("Server closed");
  process.exit(0);
};

// Handle process termination
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
