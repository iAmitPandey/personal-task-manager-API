import { Sequelize } from '@sequelize/core';

import { config } from '../config/config.js';
import UserModel from './user.js';
import TaskModel from './task.js';
import dotenv from 'dotenv';

import logger from '../config/logger.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: config.dialect,
  database: config.database,
  user: config.username,
  password: config.password,
  host: config.host,
  port: config.dbPort,
  ssl: { require: true, rejectUnauthorized: false },
  clientMinMessages: 'notice',
});

const User = UserModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const db = {
  sequelize,
  Sequelize,
  User,
  Task,
};

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connected to the database.');

    await sequelize.sync({ alter: true });
    logger.info('Database tables created or updated.');
  } catch (error) {
    logger.error('Failed to connect or sync with database:', error.message);
  }
})();

export default db;
