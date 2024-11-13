import { Op } from "sequelize";
import db from "../models/index.js";

const Task = db.Task;

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

export const getFilteredTask = async (req, res) => {
  try {
    const { priority, status, startDate, endDate, sortBy, order } = req.query;

    // Basic filters for user tasks
    const filters = {
      userId: req.user.id,
    };

    // Filter by priority
    if (priority) {
      filters.priority = priority;
    }

    // Filter by status
    if (status) {
      filters.status = status;
    }

    if (startDate && endDate) {
      filters.dueDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      filters.dueDate = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      filters.dueDate = { [Op.lte]: new Date(endDate) };
    }

    // Sorting options
    const sortOptions = [];
    if (sortBy) {
      if (sortBy === "dueDate") {
        sortOptions.push(["dueDate", order || "ASC"]);
      } else if (sortBy === "priority") {
        sortOptions.push(["priority", order || "ASC"]);
      }
    }

    if (sortOptions.length === 0) {
      sortOptions.push(["createdAt", "DESC"]);
    }

    const tasks = await Task.findAll({
      where: filters,
      order: sortOptions,
    });

    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, status } = req.body;

    // Optional: Validation for required fields
    if (!title && !description && !priority && !dueDate && !status) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided to update" });
    }

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Update only the fields that were provided in the request
    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error(error); // Optionally log the error for debugging
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
