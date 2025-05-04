import { z } from "zod";

// Common resource fields
const resourceBase = {
  title: z.string().min(1, "Title is required"),
  fileLink: z.string().url("File link must be a valid URL"),
  tags: z.array(z.string()),
  type: z.string().min(1, "Type is required"),
  author: z.string().min(1, "Author is required"),
  date: z.string().transform((str) => new Date(str)),
};

// Create resource schema
export const createResourceSchema = z.object({
  ...resourceBase,
  userId: z.string().uuid("Invalid user ID"),
});

// Update resource schema
export const updateResourceSchema = z
  .object({
    ...resourceBase,
  })
  .partial();

// Fetch resources schema
export const fetchResourcesSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

// Schema for fetch query parameters
export const resourceQuerySchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
  type: z.string().optional(),
  tags: z.array(z.string()).optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

// Export types
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
export type FetchResourcesInput = z.infer<typeof fetchResourcesSchema>;
export type ResourceQueryInput = z.infer<typeof resourceQuerySchema>;
