"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuerySchema = exports.fetchUsersSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Common user fields
const baseUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    phone: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
});
exports.createUserSchema = baseUserSchema
    .extend({
    role: zod_1.z.enum(["MENTEE", "MENTOR", "ADMIN"]),
    initials: zod_1.z.string().optional(),
})
    .transform((user) => ({
    ...user,
    initials: user.initials || `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
}));
// Update user schema
exports.updateUserSchema = baseUserSchema.extend({
    initials: zod_1.z.string().optional(),
    state: zod_1.z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
});
// Fetch users schema
exports.fetchUsersSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID").optional(),
});
// Schema for fetch query parameters
exports.userQuerySchema = zod_1.z.object({
    role: zod_1.z.enum(["MENTEE", "MENTOR", "ADMIN"]).optional(),
    state: zod_1.z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
    limit: zod_1.z.string().transform(Number).optional(),
    offset: zod_1.z.string().transform(Number).optional(),
});
