import { Router } from 'express';
import { home, apiHealth } from '../controllers/indexController.js';


const router = Router();

router.get('/', home)
router.get("/api/health", apiHealth)


export default router