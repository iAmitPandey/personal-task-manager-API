import { Router } from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import authenticate from '../middleware/user.middleware.js';
const router = Router();

// router.use(authenticate);

router.get('/', authenticate, getAllTasks);
router.post('/', authenticate, createTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

export default router;
