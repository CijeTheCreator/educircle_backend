"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressReportQuerySchema = exports.fetchProgressReportsSchema = exports.updateProgressReportSchema = exports.createProgressReportSchema = void 0;
const zod_1 = require("zod");
// Common progress report fields
const progressReportBase = {
    title: zod_1.z.string().min(1, "Title is required"),
    reportBody: zod_1.z.string().min(1, "Report body is required"),
    skills: zod_1.z.array(zod_1.z.string()),
    ratings: zod_1.z.array(zod_1.z.number().min(1).max(5)),
    stars: zod_1.z.number().min(1).max(5),
    date: zod_1.z.string().transform((str) => new Date(str)),
};
// Create progress report schema
exports.createProgressReportSchema = zod_1.z.object({
    ...progressReportBase,
    menteeId: zod_1.z.string().uuid("Invalid mentee ID"),
    mentorId: zod_1.z.string().uuid("Invalid mentor ID"),
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Update progress report schema
exports.updateProgressReportSchema = zod_1.z
    .object({
    ...progressReportBase,
})
    .partial();
// Fetch progress reports schema
exports.fetchProgressReportsSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Schema for fetch query parameters
exports.progressReportQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID").optional(),
    menteeId: zod_1.z.string().uuid("Invalid mentee ID").optional(),
    mentorId: zod_1.z.string().uuid("Invalid mentor ID").optional(),
    limit: zod_1.z.string().transform(Number).optional(),
    offset: zod_1.z.string().transform(Number).optional(),
});
