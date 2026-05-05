import { Router } from 'express';
import { home } from '../controllers/indexController.js';


const router = Router();

router.get('/', home)

export default router