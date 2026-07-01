import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import indexRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import morgan from 'morgan'

// features 
import resumeRoutes from './features/resumes/routes.js'

import cors from 'cors';

const app = express();

app.use(
    cors({
      origin: [
        "http://localhost:5173",
      ],
      credentials: true,
    })
  );


app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/', indexRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)


// RESUME Routes
app.use('/resume', resumeRoutes)




// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
