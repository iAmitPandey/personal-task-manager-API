import { Op } from 'sequelize';
import db from '../models/index.js';

const Task = db.Task;

// Create a new task
export const createTaskForUser = async (userId, taskData) => {
  return await db.Task.create({ ...taskData, userId });
};

// Get all tasks for the authenticated user (with filtering & sorting)
export const getAllTasksForUser = async (userId, filters) => {
  const { priority, status, dueDateFrom, dueDateTo, sortBy, page, limit } =
    filters;

  const where = { userId };

  if (priority) where.priority = priority;
  if (status) where.status = status;
  if (dueDateFrom || dueDateTo) {
    where.dueDate = {
      ...(dueDateFrom && { [Op.gte]: new Date(dueDateFrom) }),
      ...(dueDateTo && { [Op.lte]: new Date(dueDateTo) }),
    };
  }

  const sortOptions = [];
  if (sortBy === 'dueDateAsc') sortOptions.push(['dueDate', 'ASC']);
  else if (sortBy === 'dueDateDesc') sortOptions.push(['dueDate', 'DESC']);
  else if (sortBy === 'priorityAsc') sortOptions.push(['priority', 'ASC']);
  else if (sortBy === 'priorityDesc') sortOptions.push(['priority', 'DESC']);

  const pageNumber = page ? parseInt(page) : 1;
  const pageSize = limit ? parseInt(limit) : 10;
  const offset = (pageNumber - 1) * pageSize;

  return await db.Task.findAndCountAll({
    where,
    sortOptions,
    limit: pageSize,
    offset: offset,
  });
};

export const getTaskByIdForUser = async (taskId, userId) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new Error('Task not found or access denied.');
  }

  return task;
};

// Update a task
export const updateTaskForUser = async (taskId, userId, taskData) => {
  const { title, description, priority, dueDate, status } = taskData;

  // Optional: Validation for required fields
  if (!title && !description && !priority && !dueDate && !status) {
    throw new Error({
      success: false,
      message: 'No fields provided to update',
    });
  }

  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new Error({ success: false, message: 'Task not found' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.priority = priority || task.priority;
  task.dueDate = dueDate || task.dueDate;
  task.status = status || task.status;

  await task.save();

  return task;
};

// Delete a task
export const deleteTaskForUser = async (taskId, userId) => {
  const task = await getTaskByIdForUser(taskId, userId);
  await task.destroy();
};
