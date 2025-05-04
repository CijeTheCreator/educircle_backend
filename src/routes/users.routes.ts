import { Router } from "express";
import { prisma } from "../index";
import {
  createUserSchema,
  updateUserSchema,
  userQuerySchema,
} from "../validators/users.validator";

const router = Router();

// Create a new user
router.post("/", async (req, res) => {
  const data = createUserSchema.parse(req.body);

  const user = await prisma.user.create({
    data,
  });

  res.status(201).json({
    status: "success",
    data: user,
  });
});

// Get all users with optional filters
router.get("/", async (req, res) => {
  const query = userQuerySchema.parse(req.query);
  const { role, state, limit = 10, offset = 0 } = query;

  const where: any = {};
  if (role) where.role = role;
  if (state) where.state = state;

  const users = await prisma.user.findMany({
    where,
    take: limit,
    skip: offset,
  });

  const total = await prisma.user.count({ where });

  res.status(200).json({
    status: "success",
    data: users,
    meta: {
      total,
      limit,
      offset,
    },
  });
});

// Get mentors
router.get("/mentors", async (req, res) => {
  const mentors = await prisma.user.findMany({
    where: { role: "MENTOR" },
  });

  res.status(200).json({
    status: "success",
    data: mentors,
  });
});

// Get mentees
router.get("/mentees", async (req, res) => {
  const mentees = await prisma.user.findMany({
    where: { role: "MENTEE" },
  });

  res.status(200).json({
    status: "success",
    data: mentees,
  });
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = updateUserSchema.parse(req.body);

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Deactivate a user
router.patch("/:id/deactivate", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.update({
    where: { id },
    data: { state: "INACTIVE" },
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Activate a user
router.patch("/:id/activate", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.update({
    where: { id },
    data: { state: "ACTIVE" },
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Suspend a user
router.patch("/:id/suspend", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.update({
    where: { id },
    data: { state: "SUSPENDED" },
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export { router as userRoutes };
