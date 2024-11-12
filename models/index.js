import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import { Sequelize, DataTypes } from "sequelize";
import { env as _env } from "process";
import configFile from "../config/config.js";

// const basename = _basename(__filename);
const env = _env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;

// Initialize Sequelize instance based on environment variables or config file
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Dynamically import all model files in the 'models' directory
// readdirSync(__dirname)
//   .filter(
//     (file) =>
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       !file.endsWith(".test.js")
//   )
//   .forEach(async (file) => {
//     const { default: model } = await import(join(__dirname, file));
//     const initializedModel = model(sequelize, DataTypes);
//     db[initializedModel.name] = initializedModel;
//   });

// // Set up model associations if they exist
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
