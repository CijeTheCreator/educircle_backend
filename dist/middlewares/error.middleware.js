"use strict";
// import { Request, Response, NextFunction } from "express";
// import { ZodError } from "zod";
// import { Prisma } from "@prisma/client";
//
// export const errorMiddleware = (
//   error: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.error("Error:", error);
//
//   // Handle Zod validation errors
//   if (error instanceof ZodError) {
//     return res.status(400).json({
//       status: "error",
//       message: "Validation error",
//       errors: error.errors,
//     });
//   }
//
//   // Handle Prisma errors
//   if (error instanceof Prisma.PrismaClientKnownRequestError) {
//     // Handle unique constraint errors
//     if (error.code === "P2002") {
//       return res.status(409).json({
//         status: "error",
//         message: `A record with this ${error.meta?.target as string} already exists.`,
//       });
//     }
//
//     // Handle not found errors
//     if (error.code === "P2025") {
//       return res.status(404).json({
//         status: "error",
//         message: "Record not found.",
//       });
//     }
//
//     // Handle other Prisma errors
//     return res.status(500).json({
//       status: "error",
//       message: "Database error",
//       code: error.code,
//     });
//   }
//
//   // Handle general errors
//   res.status(500).json({
//     status: "error",
//     message: error.message || "Internal server error",
//   });
// };
