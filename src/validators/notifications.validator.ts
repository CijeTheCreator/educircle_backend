import { z } from "zod";

// Create notification schema
export const createNotificationSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  userId: z.string().uuid("Invalid user ID"),
});

// Update notification schema
export const updateNotificationSchema = z.object({
  state: z.enum(["READ", "UNREAD"]),
});

// Fetch notifications schema
export const fetchNotificationsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

// Schema for fetch query parameters
export const notificationQuerySchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
  state: z.enum(["READ", "UNREAD"]).optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

// Export types
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
export type FetchNotificationsInput = z.infer<typeof fetchNotificationsSchema>;
export type NotificationQueryInput = z.infer<typeof notificationQuerySchema>;
