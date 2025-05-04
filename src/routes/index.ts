import { Router } from "express";
import { sessionRoutes } from "./sessions.routes";
import { mentorshipRoutes } from "./mentorships.routes";
import { userRoutes } from "./users.routes";
import { notificationRoutes } from "./notifications.routes";
import { progressReportRoutes } from "./progress-reports.routes";
import { resourceRoutes } from "./resources.routes";

const router = Router();

// Register all routes
router.use("/sessions", sessionRoutes);
router.use("/mentorships", mentorshipRoutes);
router.use("/users", userRoutes);
router.use("/notifications", notificationRoutes);
router.use("/progress-reports", progressReportRoutes);
router.use("/resources", resourceRoutes);

export { router as routes };
