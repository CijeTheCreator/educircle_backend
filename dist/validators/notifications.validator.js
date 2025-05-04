"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationQuerySchema = exports.fetchNotificationsSchema = exports.updateNotificationSchema = exports.createNotificationSchema = void 0;
const zod_1 = require("zod");
// Create notification schema
exports.createNotificationSchema = zod_1.z.object({
    subject: zod_1.z.string().min(1, "Subject is required"),
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Update notification schema
exports.updateNotificationSchema = zod_1.z.object({
    state: zod_1.z.enum(["READ", "UNREAD"]),
});
// Fetch notifications schema
exports.fetchNotificationsSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Schema for fetch query parameters
exports.notificationQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID").optional(),
    state: zod_1.z.enum(["READ", "UNREAD"]).optional(),
    limit: zod_1.z.string().transform(Number).optional(),
    offset: zod_1.z.string().transform(Number).optional(),
});
