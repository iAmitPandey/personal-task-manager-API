import Task from "./task.js";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      tableName: "users",
      timestamps: true,
    }
  );

  // Define associations inside a static associate method
  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: "userId", as: "tasks" });
  };

  return User;
};
