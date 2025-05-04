import { Router } from "express";
import { prisma } from "../index";
import {
  createProgressReportSchema,
  updateProgressReportSchema,
  progressReportQuerySchema,
} from "../validators/progress-reports.validator";

const router = Router();

// Create a new progress report
router.post("/", async (req, res) => {
  const data = createProgressReportSchema.parse(req.body);

  const progressReport = await prisma.progressReport.create({
    data,
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
  });

  res.status(201).json({
    status: "success",
    data: progressReport,
  });
});

// Get all progress reports with optional filters
router.get("/", async (req, res) => {
  const query = progressReportQuerySchema.parse(req.query);
  const { userId, menteeId, mentorId, limit = 10, offset = 0 } = query;

  const where: any = {};
  if (userId) where.userId = userId;
  if (menteeId) where.menteeId = menteeId;
  if (mentorId) where.mentorId = mentorId;

  const progressReports = await prisma.progressReport.findMany({
    where,
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
    orderBy: {
      date: "desc",
    },
    take: limit,
    skip: offset,
  });

  const total = await prisma.progressReport.count({ where });

  res.status(200).json({
    status: "success",
    data: progressReports,
    meta: {
      total,
      limit,
      offset,
    },
  });
});

// Get progress reports for a specific user (either as creator, mentee, or mentor)
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const progressReports = await prisma.progressReport.findMany({
    where: {
      OR: [{ userId }, { menteeId: userId }, { mentorId: userId }],
    },
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    data: progressReports,
  });
});

// Get progress reports for a specific mentee
router.get("/mentee/:menteeId", async (req, res) => {
  const { menteeId } = req.params;

  const progressReports = await prisma.progressReport.findMany({
    where: { menteeId },
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    data: progressReports,
  });
});

// Get progress reports for a specific mentor
router.get("/mentor/:mentorId", async (req, res) => {
  const { mentorId } = req.params;

  const progressReports = await prisma.progressReport.findMany({
    where: { mentorId },
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    data: progressReports,
  });
});

// Get a specific progress report by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const progressReport = await prisma.progressReport.findUnique({
    where: { id },
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
  });

  if (!progressReport) {
    return res.status(404).json({
      status: "error",
      message: "Progress report not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: progressReport,
  });
});

// Update a progress report
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = updateProgressReportSchema.parse(req.body);

  const progressReport = await prisma.progressReport.update({
    where: { id },
    data,
    include: {
      mentee: true,
      mentor: true,
      user: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: progressReport,
  });
});

export { router as progressReportRoutes };
