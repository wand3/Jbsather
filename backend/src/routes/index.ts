import { Router } from 'express';
import type { Request, Response } from "express";
import app from '../app.js';

const router = Router()

app.get('/', (req: Request, res: Response) => {
    res.json({"Response":"Index Callback"})
})

export default router