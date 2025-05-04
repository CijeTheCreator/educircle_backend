"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const sessions_routes_1 = require("./sessions.routes");
const mentorships_routes_1 = require("./mentorships.routes");
const users_routes_1 = require("./users.routes");
const notifications_routes_1 = require("./notifications.routes");
const progress_reports_routes_1 = require("./progress-reports.routes");
const resources_routes_1 = require("./resources.routes");
const router = (0, express_1.Router)();
exports.routes = router;
// Register all routes
router.use("/sessions", sessions_routes_1.sessionRoutes);
router.use("/mentorships", mentorships_routes_1.mentorshipRoutes);
router.use("/users", users_routes_1.userRoutes);
router.use("/notifications", notifications_routes_1.notificationRoutes);
router.use("/progress-reports", progress_reports_routes_1.progressReportRoutes);
router.use("/resources", resources_routes_1.resourceRoutes);
