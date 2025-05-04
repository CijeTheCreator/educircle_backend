import "express-async-errors";
import { app } from "./app";
import { PrismaClient } from "@prisma/client";

// Create a Prisma client instance
export const prisma = new PrismaClient();

// Export the app for use in server.ts
export { app };
