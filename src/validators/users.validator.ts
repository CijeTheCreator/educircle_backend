import { z } from "zod";

// Common user fields
const baseUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export const createUserSchema = baseUserSchema
  .extend({
    role: z.enum(["MENTEE", "MENTOR", "ADMIN"]),
    initials: z.string().optional(),
  })
  .transform((user) => ({
    ...user,
    initials:
      user.initials || `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
  }));

// Update user schema
export const updateUserSchema = baseUserSchema.extend({
  initials: z.string().optional(),
  state: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
});

// Fetch users schema
export const fetchUsersSchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
});

// Schema for fetch query parameters
export const userQuerySchema = z.object({
  role: z.enum(["MENTEE", "MENTOR", "ADMIN"]).optional(),
  state: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

// Export types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type FetchUsersInput = z.infer<typeof fetchUsersSchema>;
export type UserQueryInput = z.infer<typeof userQuerySchema>;
