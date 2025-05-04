"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./index");
// Load environment variables
dotenv_1.default.config();
// Define the port
const PORT = process.env.PORT || 3000;
// Start the server
const server = index_1.app.listen(PORT, () => {
    console.log(`EduCircle API server running on port ${PORT}`);
});
// Handle server shutdown
const shutdown = async () => {
    console.log("Shutting down server...");
    await server.close();
    await index_1.prisma.$disconnect();
    console.log("Server closed");
    process.exit(0);
};
// Handle process termination
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
