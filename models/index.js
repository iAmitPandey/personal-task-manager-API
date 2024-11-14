// import { Sequelize } from "sequelize";
// import { config } from "../config/config.js";

// import UserModel from "./user.js";
// import TaskModel from "./task.js";
// import dotenv from "dotenv";
// // import { connectDB } from "../connections/db.connect.js";
// dotenv.config();

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect,
//     port: config.dbPort,
//   }
// );

// const User = UserModel(sequelize, Sequelize.DataTypes);
// const Task = TaskModel(sequelize, Sequelize.DataTypes);
// const db = {
//   sequelize,
//   Sequelize,
//   User,
//   Task,
// };
// db.User.hasMany(db.Task, { foreignKey: "userId" });
// db.Task.belongsTo(db.User, { foreignKey: "userId" });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connected to the database.");

//     await sequelize.sync(); // Create tables if they don’t exist
//     console.log("Database tables created or updated.");
//   } catch (error) {
//     console.error("Failed to connect or sync with database:", error.message);
//   }
// })();

// // Synchronize the models with the database
// // db.sequelize.sync({ force: false });

// export default db;
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

// Define relationships after model initialization
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

    await sequelize.sync({ alter: true }); // Update tables to match model structure
    console.log("Database tables created or updated.");
  } catch (error) {
    console.error("Failed to connect or sync with database:", error.message);
  }
})();

export default db;
