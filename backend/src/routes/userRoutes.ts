import { Router } from "express";
import { allUsers } from '../controllers/userController.js'
import { createUser } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requirePermission } from "../middlewares/permissions.js";

const router = Router();

// router.use(authMiddleware)
router.get('/users', authMiddleware, requirePermission("create_job"), allUsers)


export default router;
