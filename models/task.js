"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Define the association with the User model
      Task.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "Tasks",
      timestamps: true,
    }
  );

  return Task;
};
