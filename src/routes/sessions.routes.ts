import { Router } from "express";
import { prisma } from "../index";
import {
  createSessionSchema,
  updateSessionSchema,
  sessionQuerySchema,
  CreateSessionInput,
  UpdateSessionInput,
} from "../validators/sessions.validator";

const router = Router();

// Create a new session
router.post("/", async (req, res) => {
  const data = createSessionSchema.parse(req.body);
  const { userIds, ...sessionData } = data;

  const session = await prisma.session.create({
    data: {
      ...sessionData,
      users: userIds
        ? {
            connect: userIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      user: true,
      users: true,
    },
  });

  res.status(201).json({
    status: "success",
    data: session,
  });
});

// Get all sessions with optional filters
router.get("/", async (req, res) => {
  const query = sessionQuerySchema.parse(req.query);
  const { userId, state, limit = 10, offset = 0 } = query;

  const where: any = {};
  if (userId) where.userId = userId;
  if (state) where.state = state;

  const sessions = await prisma.session.findMany({
    where,
    include: {
      user: true,
      users: true,
    },
    take: limit,
    skip: offset,
  });

  const total = await prisma.session.count({ where });

  res.status(200).json({
    status: "success",
    data: sessions,
    meta: {
      total,
      limit,
      offset,
    },
  });
});

// Get sessions for a specific user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const sessions = await prisma.session.findMany({
    where: {
      OR: [{ userId }, { users: { some: { id: userId } } }],
    },
    include: {
      user: true,
      users: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: sessions,
  });
});

// Get a specific session by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      user: true,
      users: true,
    },
  });

  if (!session) {
    return res.status(404).json({
      status: "error",
      message: "Session not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: session,
  });
});

// Update a session (for rescheduling)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = updateSessionSchema.parse(req.body) as UpdateSessionInput;

  const session = await prisma.session.update({
    where: { id },
    data,
    include: {
      user: true,
      users: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: session,
  });
});

// Cancel a session
router.patch("/:id/cancel", async (req, res) => {
  const { id } = req.params;

  const session = await prisma.session.update({
    where: { id },
    data: { state: "CANCELLED" },
    include: {
      user: true,
      users: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: session,
  });
});

export { router as sessionRoutes };
