"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const sessions_validator_1 = require("../validators/sessions.validator");
const router = (0, express_1.Router)();
exports.sessionRoutes = router;
// Create a new session
router.post("/", async (req, res) => {
    const data = sessions_validator_1.createSessionSchema.parse(req.body);
    const { userIds, ...sessionData } = data;
    const session = await index_1.prisma.session.create({
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
    const query = sessions_validator_1.sessionQuerySchema.parse(req.query);
    const { userId, state, limit = 10, offset = 0 } = query;
    const where = {};
    if (userId)
        where.userId = userId;
    if (state)
        where.state = state;
    const sessions = await index_1.prisma.session.findMany({
        where,
        include: {
            user: true,
            users: true,
        },
        take: limit,
        skip: offset,
    });
    const total = await index_1.prisma.session.count({ where });
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
    const sessions = await index_1.prisma.session.findMany({
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
    const session = await index_1.prisma.session.findUnique({
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
    const data = sessions_validator_1.updateSessionSchema.parse(req.body);
    const session = await index_1.prisma.session.update({
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
    const session = await index_1.prisma.session.update({
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
