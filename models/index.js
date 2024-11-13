import { Sequelize, DataTypes } from "sequelize";
import { env as _env } from "process";
import configFile from "../config/config.js";
import initUserModel from "./user.js";
import initTaskModel from "./user.js";

const env = _env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize the model
initUserModel(sequelize, DataTypes);
initTaskModel(sequelize, DataTypes);

sequelize.sync({ force: true });

// export default db;
export default sequelize;
