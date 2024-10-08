import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';

config();
const app = express();

// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Options
const corsOptions = {
  origin: 'https://cool-mandazi-e8d525.netlify.app', // Use process.env.FRONTEND_URL in production
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Custom middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
