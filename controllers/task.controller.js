import Task from "../models/index.js";
import { Op } from "sequelize";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Create a new task associated with the user
    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      userId,
    });

    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tasks for the authenticated user (with filtering & sorting)
export const getAllTasks = async (req, res) => {
  try {
    const { priority, status, dueDate, sortBy } = req.query;

    const filters = {
      userId: req.user.id,
    };

    if (priority) filters.priority = priority;
    if (status) filters.status = status;
    if (dueDate) filters.dueDate = { [Op.eq]: dueDate };

    const sortOptions = [];
    if (sortBy === "dueDate") sortOptions.push(["dueDate", "ASC"]);
    if (sortBy === "priority") sortOptions.push(["priority", "ASC"]);

    const tasks = await Task.findAll({
      where: filters,
      order: sortOptions.length ? sortOptions : [["createdAt", "DESC"]],
    });

    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, status } = req.body;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.destroy();
    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
