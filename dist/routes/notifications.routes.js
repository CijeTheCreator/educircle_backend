"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const notifications_validator_1 = require("../validators/notifications.validator");
const router = (0, express_1.Router)();
exports.notificationRoutes = router;
// Create a new notification
router.post("/", async (req, res) => {
    const data = notifications_validator_1.createNotificationSchema.parse(req.body);
    const notification = await index_1.prisma.notification.create({
        data,
        include: {
            user: true,
        },
    });
    res.status(201).json({
        status: "success",
        data: notification,
    });
});
// Get all notifications with optional filters
router.get("/", async (req, res) => {
    const query = notifications_validator_1.notificationQuerySchema.parse(req.query);
    const { userId, state, limit = 10, offset = 0 } = query;
    const where = {};
    if (userId)
        where.userId = userId;
    if (state)
        where.state = state;
    const notifications = await index_1.prisma.notification.findMany({
        where,
        include: {
            user: true,
        },
        orderBy: {
            timePosted: "desc",
        },
        take: limit,
        skip: offset,
    });
    const total = await index_1.prisma.notification.count({ where });
    res.status(200).json({
        status: "success",
        data: notifications,
        meta: {
            total,
            limit,
            offset,
        },
    });
});
// Get notifications for a specific user
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const notifications = await index_1.prisma.notification.findMany({
        where: { userId },
        include: {
            user: true,
        },
        orderBy: {
            timePosted: "desc",
        },
    });
    res.status(200).json({
        status: "success",
        data: notifications,
    });
});
// Get a specific notification by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const notification = await index_1.prisma.notification.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });
    if (!notification) {
        return res.status(404).json({
            status: "error",
            message: "Notification not found",
        });
    }
    res.status(200).json({
        status: "success",
        data: notification,
    });
});
// Update a notification (mark as read/unread)
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { state } = notifications_validator_1.updateNotificationSchema.parse(req.body);
    const notification = await index_1.prisma.notification.update({
        where: { id },
        data: { state },
        include: {
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: notification,
    });
});
// Mark a notification as read
router.patch("/:id/read", async (req, res) => {
    const { id } = req.params;
    const notification = await index_1.prisma.notification.update({
        where: { id },
        data: { state: "READ" },
        include: {
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: notification,
    });
});
// Mark a notification as unread
router.patch("/:id/unread", async (req, res) => {
    const { id } = req.params;
    const notification = await index_1.prisma.notification.update({
        where: { id },
        data: { state: "UNREAD" },
        include: {
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: notification,
    });
});
// Mark all notifications as read for a user
router.post("/user/:userId/read-all", async (req, res) => {
    const { userId } = req.params;
    await index_1.prisma.notification.updateMany({
        where: {
            userId,
            state: "UNREAD",
        },
        data: { state: "READ" },
    });
    res.status(200).json({
        status: "success",
        message: "All notifications marked as read",
    });
});
