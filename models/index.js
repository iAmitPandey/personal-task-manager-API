import { Sequelize } from "sequelize";
import { config } from "../config/config.js";

import UserModel from "./user.js";
import TaskModel from "./task.js";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.dbPort,
  }
);

const User = UserModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);
const db = {
  sequelize,
  Sequelize,
  User,
  Task,
};

db.User.hasMany(db.Task, { foreignKey: "userId" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

// Synchronize the models with the database
db.sequelize.sync({ force: false });

export default db;
