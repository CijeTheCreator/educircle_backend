"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentorshipQuerySchema = exports.fetchMentorshipsSchema = exports.updateMentorshipStatusSchema = exports.createMentorshipSchema = void 0;
const zod_1 = require("zod");
// Create mentorship schema
exports.createMentorshipSchema = zod_1.z.object({
    menteeId: zod_1.z.string().uuid("Invalid mentee ID"),
    mentorId: zod_1.z.string().uuid("Invalid mentor ID"),
    userId: zod_1.z.string().uuid("Invalid user ID"),
    note: zod_1.z.string().optional(),
});
// Update mentorship status schema
exports.updateMentorshipStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "REQUESTED",
        "APPROVED",
        "DENIED",
        "ACCEPTED",
        "REJECTED",
        "CANCELLED",
        "SUSPENDED",
    ]),
    note: zod_1.z.string().optional(),
});
// Fetch mentorships schema
exports.fetchMentorshipsSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Schema for fetch query parameters
exports.mentorshipQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID").optional(),
    menteeId: zod_1.z.string().uuid("Invalid mentee ID").optional(),
    mentorId: zod_1.z.string().uuid("Invalid mentor ID").optional(),
    status: zod_1.z
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
    limit: zod_1.z.string().transform(Number).optional(),
    offset: zod_1.z.string().transform(Number).optional(),
});
