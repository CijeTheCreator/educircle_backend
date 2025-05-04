"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const errorMiddleware = (error, req, res, next) => {
    console.error("Error:", error);
    // Handle Zod validation errors
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            status: "error",
            message: "Validation error",
            errors: error.errors,
        });
    }
    // Handle Prisma errors
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // Handle unique constraint errors
        if (error.code === "P2002") {
            return res.status(409).json({
                status: "error",
                message: `A record with this ${error.meta?.target} already exists.`,
            });
        }
        // Handle not found errors
        if (error.code === "P2025") {
            return res.status(404).json({
                status: "error",
                message: "Record not found.",
            });
        }
        // Handle other Prisma errors
        return res.status(500).json({
            status: "error",
            message: "Database error",
            code: error.code,
        });
    }
    // Handle general errors
    res.status(500).json({
        status: "error",
        message: error.message || "Internal server error",
    });
};
exports.errorMiddleware = errorMiddleware;
