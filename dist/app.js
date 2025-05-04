"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./routes");
const error_middleware_1 = require("./middlewares/error.middleware");
// Create Express application
const app = (0, express_1.default)();
exports.app = app;
// Apply middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
// Apply routes
app.use("/api", routes_1.routes);
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "EduCircle API is running" });
});
// Apply error handling middleware
app.use(error_middleware_1.errorMiddleware);
