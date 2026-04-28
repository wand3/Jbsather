import { Router } from "express";
import { user } from '../controllers/userController.js'

const router = Router();

router.get('/user', user)
// router.post('/register', createUser)
// router.post('/login', loginUser)
// router.put('/update', updateUser)

export default router;
