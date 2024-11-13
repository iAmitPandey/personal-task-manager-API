export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
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

  // // `sequelize.define` also returns the model
  // console.log(User === sequelize.models.User); // true
};
