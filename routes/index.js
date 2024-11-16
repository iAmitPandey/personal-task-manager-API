import express from 'express';
import authRoutes from './user.routes.js';
import taskRoutes from './tasks.routes.js';

const router = express.Router();

// Add all route modules here
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

export default router;
