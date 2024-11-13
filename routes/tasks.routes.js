import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import authenticate from "../middleware/auth.middleware.js";
const router = Router();

router.use(authenticate);

router.get("/", getAllTasks); // Get all tasks
router.post("/", createTask); // Create a new task
router.put("/:id", updateTask); // Update task
router.delete("/:id", deleteTask); // Delete task

export default router;
