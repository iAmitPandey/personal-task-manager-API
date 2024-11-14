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

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

const db = {
  sequelize,
  Sequelize,
  User,
  Task,
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database.");

    await sequelize.sync({ alter: true });
    console.log("Database tables created or updated.");
  } catch (error) {
    console.error("Failed to connect or sync with database:", error.message);
  }
})();

export default db;
