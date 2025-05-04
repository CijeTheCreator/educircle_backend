"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentorshipRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const mentorships_validator_1 = require("../validators/mentorships.validator");
const router = (0, express_1.Router)();
exports.mentorshipRoutes = router;
// Create a new mentorship request
router.post("/", async (req, res) => {
    const data = mentorships_validator_1.createMentorshipSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.create({
        data,
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(201).json({
        status: "success",
        data: mentorship,
    });
});
// Get all mentorships with optional filters
router.get("/", async (req, res) => {
    const query = mentorships_validator_1.mentorshipQuerySchema.parse(req.query);
    const { userId, menteeId, mentorId, status, limit = 10, offset = 0 } = query;
    const where = {};
    if (userId)
        where.userId = userId;
    if (menteeId)
        where.menteeId = menteeId;
    if (mentorId)
        where.mentorId = mentorId;
    if (status)
        where.status = status;
    const mentorships = await index_1.prisma.mentorship.findMany({
        where,
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
        take: limit,
        skip: offset,
    });
    const total = await index_1.prisma.mentorship.count({ where });
    res.status(200).json({
        status: "success",
        data: mentorships,
        meta: {
            total,
            limit,
            offset,
        },
    });
});
// Get mentorships for a specific user (as mentor or mentee)
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const mentorships = await index_1.prisma.mentorship.findMany({
        where: {
            OR: [{ menteeId: userId }, { mentorId: userId }, { userId }],
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorships,
    });
});
// Get a specific mentorship by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const mentorship = await index_1.prisma.mentorship.findUnique({
        where: { id },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    if (!mentorship) {
        return res.status(404).json({
            status: "error",
            message: "Mentorship not found",
        });
    }
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
// Approve mentorship request (by admin)
router.patch("/:id/approve", async (req, res) => {
    const { id } = req.params;
    const { note } = mentorships_validator_1.updateMentorshipStatusSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.update({
        where: { id },
        data: {
            status: "APPROVED",
            note: note,
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
// Deny mentorship request (by admin)
router.patch("/:id/deny", async (req, res) => {
    const { id } = req.params;
    const { note } = mentorships_validator_1.updateMentorshipStatusSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.update({
        where: { id },
        data: {
            status: "DENIED",
            note: note,
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
// Accept mentorship request (by mentor)
router.patch("/:id/accept", async (req, res) => {
    const { id } = req.params;
    const { note } = mentorships_validator_1.updateMentorshipStatusSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.update({
        where: { id },
        data: {
            status: "ACCEPTED",
            note: note,
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
// Reject mentorship request (by mentor)
router.patch("/:id/reject", async (req, res) => {
    const { id } = req.params;
    const { note } = mentorships_validator_1.updateMentorshipStatusSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.update({
        where: { id },
        data: {
            status: "REJECTED",
            note: note,
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
// Cancel mentorship (by any participant)
router.patch("/:id/cancel", async (req, res) => {
    const { id } = req.params;
    const { note } = mentorships_validator_1.updateMentorshipStatusSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.update({
        where: { id },
        data: {
            status: "CANCELLED",
            note: note,
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
// Suspend mentorship (by admin)
router.patch("/:id/suspend", async (req, res) => {
    const { id } = req.params;
    const { note } = mentorships_validator_1.updateMentorshipStatusSchema.parse(req.body);
    const mentorship = await index_1.prisma.mentorship.update({
        where: { id },
        data: {
            status: "SUSPENDED",
            note: note,
        },
        include: {
            mentee: true,
            mentor: true,
            user: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: mentorship,
    });
});
