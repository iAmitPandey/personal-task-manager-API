import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Sequelize, DataTypes } from "sequelize";
import { env as _env } from "process";
import { config as configFile } from "../config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = _env.NODE_ENV || "development";
const config = configFile[env];
let db = {};

let sequelize;

// Initialize Sequelize instance
if (config?.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Dynamically import all model files in the 'models' directory
const modelFiles = readdirSync(__dirname).filter(
  (file) =>
    file.indexOf(".") !== 0 &&
    file !== "index.js" &&
    file.endsWith(".js") &&
    !file.endsWith(".test.js")
);

// Initialize models and add them to the db object
for (const file of modelFiles) {
  const { default: modelInit } = await import(join(__dirname, file));
  const model = modelInit(sequelize, DataTypes);
  db[model.name] = model;
}

// Set up model associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Manually define associations if not handled by model's associate method
if (db.User && db.Task) {
  db.User.hasMany(db.Task, { foreignKey: "userId" });
  db.Task.belongsTo(db.User, { foreignKey: "userId" });
}

// Export initialized db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Synchronize the models with the database
db.sequelize.sync({ force: false });

export default db;
