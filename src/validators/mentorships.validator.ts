import { z } from "zod";

// Create mentorship schema
export const createMentorshipSchema = z.object({
  menteeId: z.string().uuid("Invalid mentee ID"),
  mentorId: z.string().uuid("Invalid mentor ID"),
  userId: z.string().uuid("Invalid user ID"),
  note: z.string().optional(),
});

// Update mentorship status schema
export const updateMentorshipStatusSchema = z.object({
  status: z.enum([
    "REQUESTED",
    "APPROVED",
    "DENIED",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "SUSPENDED",
  ]),
  note: z.string().optional(),
});

// Fetch mentorships schema
export const fetchMentorshipsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

// Schema for fetch query parameters
export const mentorshipQuerySchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
  menteeId: z.string().uuid("Invalid mentee ID").optional(),
  mentorId: z.string().uuid("Invalid mentor ID").optional(),
  status: z
    .enum([
      "REQUESTED",
      "APPROVED",
      "DENIED",
      "ACCEPTED",
      "REJECTED",
      "CANCELLED",
      "SUSPENDED",
    ])
    .optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

// Export types
export type CreateMentorshipInput = z.infer<typeof createMentorshipSchema>;
export type UpdateMentorshipStatusInput = z.infer<
  typeof updateMentorshipStatusSchema
>;
export type FetchMentorshipsInput = z.infer<typeof fetchMentorshipsSchema>;
export type MentorshipQueryInput = z.infer<typeof mentorshipQuerySchema>;
