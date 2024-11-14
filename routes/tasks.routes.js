import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getFilteredTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import authenticate from "../middleware/auth.middleware.js";
const router = Router();

// router.use(authenticate);

router.get("/", authenticate, getAllTasks); // Get all tasks
router.post("/", authenticate, createTask); // Create a new task
router.get("/", authenticate, getFilteredTask);
router.put("/:id", authenticate, updateTask); // Update task
router.delete("/:id", authenticate, deleteTask); // Delete task

export default router;
