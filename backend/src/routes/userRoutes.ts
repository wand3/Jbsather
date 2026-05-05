import { Router } from "express";
import { allUsers } from '../controllers/userController.js'

const router = Router();

router.get('/users', allUsers)
// router.post('/register', createUser)
// router.post('/login', loginUser)
// router.put('/update', updateUser)

export default router;
