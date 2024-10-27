import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
config();
const app = express();
app.use(morgan('dev'));
// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Options
const corsOptions = {
  origin: "https://lms-main-2yg9qwqn4-yghs-projects.vercel.app", // set to exact frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware globally
app.use(cors(corsOptions));

// Middleware to ensure Access-Control-Allow-Origin is explicitly set
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://lms-main-2yg9qwqn4-yghs-projects.vercel.app"); // exact URL, not *
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Explicitly handle OPTIONS requests for preflight
app.options('*', cors(corsOptions));

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Default catch-all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
