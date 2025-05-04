"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.prisma = void 0;
require("express-async-errors");
const app_1 = require("./app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
const client_1 = require("@prisma/client");
// Create a Prisma client instance
exports.prisma = new client_1.PrismaClient();
