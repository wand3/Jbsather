import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { requirePermission } from "../../middlewares/permissions.js";
import { createResume } from "../resumes/contollers.js";

const router = Router();

// router.use(authMiddleware)
router.post('/create/:id', authMiddleware, requirePermission("vather"), createResume)


export default router;