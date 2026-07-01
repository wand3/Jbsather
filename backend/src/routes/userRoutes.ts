import { Router } from "express";
import { allUsers, addEducation, getUserEducation, getEducationById, deleteEducation, updateEducation } from '../controllers/userController.js'
import { createUser } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requirePermission } from "../middlewares/permissions.js";

const router = Router();

// router.use(authMiddleware)
router.get('/users', authMiddleware, requirePermission("vather"), allUsers)
router.post('/education', authMiddleware, requirePermission("vather"), addEducation)
router.get('/education', authMiddleware, requirePermission("vather"), getUserEducation)
router.get('/education/:id', authMiddleware, requirePermission("vather"), getEducationById)
router.put('/education', authMiddleware, requirePermission("vather"), updateEducation)
router.delete('/education', authMiddleware, requirePermission("vather"), deleteEducation)



export default router;
