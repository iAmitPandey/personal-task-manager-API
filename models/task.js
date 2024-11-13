export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Tasks",
    {
      // Model attributes are defined here
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
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      // Other model options go here
      tableName: "tasks",
      timestamps: true,
    }
  );

  // // `sequelize.define` also returns the model
  // console.log(Task === sequelize.models.Task); // true

  return Task;
};
