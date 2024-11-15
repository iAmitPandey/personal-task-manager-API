export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { type: DataTypes.TEXT },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      tableName: 'Tasks',
      timestamps: true,
      paranoid: true,
    }
  );

 

  return Task;
};
