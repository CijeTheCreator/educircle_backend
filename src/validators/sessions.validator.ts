import { z } from "zod";

// Common fields
const sessionBase = {
  title: z.string().min(1, "Title is required"),
  time: z.string().transform((str) => new Date(str)),
  date: z.string().transform((str) => new Date(str)),
};

// Create session schema
export const createSessionSchema = z.object({
  ...sessionBase,
  userId: z.string().uuid("Invalid user ID"),
  userIds: z.array(z.string().uuid("Invalid user ID")).optional(),
});

// Update session schema
export const updateSessionSchema = z.object({
  ...sessionBase,
  state: z
    .enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"])
    .optional(),
});

// Fetch sessions schema
export const fetchSessionsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

// Schema for fetch query parameters
export const sessionQuerySchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
  state: z
    .enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"])
    .optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

// Export types
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;
export type FetchSessionsInput = z.infer<typeof fetchSessionsSchema>;
export type SessionQueryInput = z.infer<typeof sessionQuerySchema>;
