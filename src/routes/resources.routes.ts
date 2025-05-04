import { Router } from "express";
import { prisma } from "../index";
import {
  createResourceSchema,
  updateResourceSchema,
  resourceQuerySchema,
} from "../validators/resources.validator";

const router = Router();

// Create a new resource
router.post("/", async (req, res) => {
  const data = createResourceSchema.parse(req.body);

  const resource = await prisma.resource.create({
    data,
    include: {
      user: true,
    },
  });

  res.status(201).json({
    status: "success",
    data: resource,
  });
});

// Get all resources with optional filters
router.get("/", async (req, res) => {
  const query = resourceQuerySchema.parse(req.query);
  const { userId, type, tags, limit = 10, offset = 0 } = query;

  const where: any = {};
  if (userId) where.userId = userId;
  if (type) where.type = type;
  if (tags && tags.length > 0) {
    where.tags = {
      hasSome: tags,
    };
  }

  const resources = await prisma.resource.findMany({
    where,
    include: {
      user: true,
    },
    orderBy: {
      date: "desc",
    },
    take: limit,
    skip: offset,
  });

  const total = await prisma.resource.count({ where });

  res.status(200).json({
    status: "success",
    data: resources,
    meta: {
      total,
      limit,
      offset,
    },
  });
});

// Get resources for a specific user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const resources = await prisma.resource.findMany({
    where: { userId },
    include: {
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    data: resources,
  });
});

// Get resources by tag
router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;

  const resources = await prisma.resource.findMany({
    where: {
      tags: {
        has: tag,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    data: resources,
  });
});

// Get resources by type
router.get("/type/:type", async (req, res) => {
  const { type } = req.params;

  const resources = await prisma.resource.findMany({
    where: { type },
    include: {
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    data: resources,
  });
});

// Get a specific resource by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const resource = await prisma.resource.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!resource) {
    return res.status(404).json({
      status: "error",
      message: "Resource not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: resource,
  });
});

// Update a resource
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = updateResourceSchema.parse(req.body);

  const resource = await prisma.resource.update({
    where: { id },
    data,
    include: {
      user: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: resource,
  });
});

export { router as resourceRoutes };
