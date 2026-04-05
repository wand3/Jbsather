import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import indexRoutes from './routes/index.js'

const app = express();

app.use(express.json());

// API Routes
app.use('/', indexRoutes)

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
