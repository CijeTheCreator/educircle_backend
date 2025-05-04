"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceQuerySchema = exports.fetchResourcesSchema = exports.updateResourceSchema = exports.createResourceSchema = void 0;
const zod_1 = require("zod");
// Common resource fields
const resourceBase = {
    title: zod_1.z.string().min(1, "Title is required"),
    fileLink: zod_1.z.string().url("File link must be a valid URL"),
    tags: zod_1.z.array(zod_1.z.string()),
    type: zod_1.z.string().min(1, "Type is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    date: zod_1.z.string().transform((str) => new Date(str)),
};
// Create resource schema
exports.createResourceSchema = zod_1.z.object({
    ...resourceBase,
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Update resource schema
exports.updateResourceSchema = zod_1.z
    .object({
    ...resourceBase,
})
    .partial();
// Fetch resources schema
exports.fetchResourcesSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID"),
});
// Schema for fetch query parameters
exports.resourceQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().uuid("Invalid user ID").optional(),
    type: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    limit: zod_1.z.string().transform(Number).optional(),
    offset: zod_1.z.string().transform(Number).optional(),
});
