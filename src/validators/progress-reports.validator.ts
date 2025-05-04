import { z } from "zod";

// Common progress report fields
const progressReportBase = {
  title: z.string().min(1, "Title is required"),
  reportBody: z.string().min(1, "Report body is required"),
  skills: z.array(z.string()),
  ratings: z.array(z.number().min(1).max(5)),
  stars: z.number().min(1).max(5),
  date: z.string().transform((str) => new Date(str)),
};

// Create progress report schema
export const createProgressReportSchema = z.object({
  ...progressReportBase,
  menteeId: z.string().uuid("Invalid mentee ID"),
  mentorId: z.string().uuid("Invalid mentor ID"),
  userId: z.string().uuid("Invalid user ID"),
});

// Update progress report schema
export const updateProgressReportSchema = z
  .object({
    ...progressReportBase,
  })
  .partial();

// Fetch progress reports schema
export const fetchProgressReportsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

// Schema for fetch query parameters
export const progressReportQuerySchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
  menteeId: z.string().uuid("Invalid mentee ID").optional(),
  mentorId: z.string().uuid("Invalid mentor ID").optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

// Export types
export type CreateProgressReportInput = z.infer<
  typeof createProgressReportSchema
>;
export type UpdateProgressReportInput = z.infer<
  typeof updateProgressReportSchema
>;
export type FetchProgressReportsInput = z.infer<
  typeof fetchProgressReportsSchema
>;
export type ProgressReportQueryInput = z.infer<
  typeof progressReportQuerySchema
>;
