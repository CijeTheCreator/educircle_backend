"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionQuerySchema = exports.fetchSessionsSchema = exports.updateSessionSchema = exports.createSessionSchema = void 0;
const zod_1 = require("zod");
// Common fields
const sessionBase = {
    title: zod_1.z.string().min(1, "Title is required"),
    time: zod_1.z.string().transform((str) => new Date(str)),
    date: zod_1.z.string().transform((str) => new Date(str)),
};
// Create session schema
exports.createSessionSchema = zod_1.z.object({
    ...sessionBase,
    userId: zod_1.z.string().uuid("Invalid user ID"),
    userIds: zod_1.z.array(zod_1.z.string().uuid("Invalid user ID")).optional(),
});
// Update session schema
exports.updateSessionSchema = zod_1.z.object({
    ...sessionBase,
    state: zod_1.z
        .enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"])
        .optional(),
});
// Fetch sessions schema
exports.fetchSessionsSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Schema for fetch query parameters
exports.sessionQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID").optional(),
    state: zod_1.z
        .enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"])
        .optional(),
    limit: zod_1.z.string().transform(Number).optional(),
    offset: zod_1.z.string().transform(Number).optional(),
});
