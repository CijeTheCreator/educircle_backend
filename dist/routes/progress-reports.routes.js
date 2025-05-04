"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressReportRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const progress_reports_validator_1 = require("../validators/progress-reports.validator");
const router = (0, express_1.Router)();
exports.progressReportRoutes = router;
// Create a new progress report
router.post("/", async (req, res) => {
    const data = progress_reports_validator_1.createProgressReportSchema.parse(req.body);
    const progressReport = await index_1.prisma.progressReport.create({
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
    const query = progress_reports_validator_1.progressReportQuerySchema.parse(req.query);
    const { userId, menteeId, mentorId, limit = 10, offset = 0 } = query;
    const where = {};
    if (userId)
        where.userId = userId;
    if (menteeId)
        where.menteeId = menteeId;
    if (mentorId)
        where.mentorId = mentorId;
    const progressReports = await index_1.prisma.progressReport.findMany({
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
    const total = await index_1.prisma.progressReport.count({ where });
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
    const progressReports = await index_1.prisma.progressReport.findMany({
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
    const progressReports = await index_1.prisma.progressReport.findMany({
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
    const progressReports = await index_1.prisma.progressReport.findMany({
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
    const progressReport = await index_1.prisma.progressReport.findUnique({
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
    const data = progress_reports_validator_1.updateProgressReportSchema.parse(req.body);
    const progressReport = await index_1.prisma.progressReport.update({
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
