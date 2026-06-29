import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { requirePermission } from "../../middlewares/permissions.js";
import { createResumes } from "../../controllers/authControllers.js";

const router = Router();

// router.use(authMiddleware)
router.post('/resumes', authMiddleware, requirePermission("vather"), createResume)


export default router;