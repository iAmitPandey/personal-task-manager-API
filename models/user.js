import Task from "./task.js";
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
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

  User.hasMany(Task, { foreignKey: "userId" });
  return User;
};
