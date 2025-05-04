import { Router } from "express";
import { prisma } from "../index";
import {
  createNotificationSchema,
  updateNotificationSchema,
  notificationQuerySchema,
} from "../validators/notifications.validator";

const router = Router();

// Create a new notification
router.post("/", async (req, res) => {
  const data = createNotificationSchema.parse(req.body);

  const notification = await prisma.notification.create({
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
  const query = notificationQuerySchema.parse(req.query);
  const { userId, state, limit = 10, offset = 0 } = query;

  const where: any = {};
  if (userId) where.userId = userId;
  if (state) where.state = state;

  const notifications = await prisma.notification.findMany({
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

  const total = await prisma.notification.count({ where });

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

  const notifications = await prisma.notification.findMany({
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

  const notification = await prisma.notification.findUnique({
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
  const { state } = updateNotificationSchema.parse(req.body);

  const notification = await prisma.notification.update({
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

  const notification = await prisma.notification.update({
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

  const notification = await prisma.notification.update({
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

  await prisma.notification.updateMany({
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

export { router as notificationRoutes };
