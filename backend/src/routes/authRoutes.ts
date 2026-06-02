import { Router } from "express";
import { getUser, createUser, updateUser, loginUser } from "../controllers/authControllers.js";

const router = Router()

router.get('/user', getUser)
router.post('/register', createUser)
router.post('/login', loginUser)

router.put('/update', updateUser)

export default router;