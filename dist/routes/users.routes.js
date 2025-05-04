"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const users_validator_1 = require("../validators/users.validator");
const router = (0, express_1.Router)();
exports.userRoutes = router;
// Create a new user
router.post("/", async (req, res) => {
    const data = users_validator_1.createUserSchema.parse(req.body);
    const user = await index_1.prisma.user.create({
        data,
    });
    res.status(201).json({
        status: "success",
        data: user,
    });
});
// Get all users with optional filters
router.get("/", async (req, res) => {
    const query = users_validator_1.userQuerySchema.parse(req.query);
    const { role, state, limit = 10, offset = 0 } = query;
    const where = {};
    if (role)
        where.role = role;
    if (state)
        where.state = state;
    const users = await index_1.prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
    });
    const total = await index_1.prisma.user.count({ where });
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
    const mentors = await index_1.prisma.user.findMany({
        where: { role: "MENTOR" },
    });
    res.status(200).json({
        status: "success",
        data: mentors,
    });
});
// Get mentees
router.get("/mentees", async (req, res) => {
    const mentees = await index_1.prisma.user.findMany({
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
    const user = await index_1.prisma.user.findUnique({
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
    const data = users_validator_1.updateUserSchema.parse(req.body);
    const user = await index_1.prisma.user.update({
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
    const user = await index_1.prisma.user.update({
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
    const user = await index_1.prisma.user.update({
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
    const user = await index_1.prisma.user.update({
        where: { id },
        data: { state: "SUSPENDED" },
    });
    res.status(200).json({
        status: "success",
        data: user,
    });
});
