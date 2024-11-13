// "use strict";

// export default {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("tasks", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false,
//       },
//       title: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       description: Sequelize.TEXT,
//       priority: {
//         type: Sequelize.ENUM("low", "medium", "high"),
//         allowNull: false,
//       },
//       dueDate: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//       status: {
//         type: Sequelize.ENUM("pending", "completed"),
//         allowNull: false,
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: "users",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.fn("NOW"),
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.fn("NOW"),
//       },
//     });
//   },

//   async down(queryInterface) {
//     await queryInterface.dropTable("Tasks");
//   },
// };

"use strict";

import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("tasks", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: Sequelize.TEXT,
    priority: {
      type: Sequelize.ENUM("low", "medium", "high"),
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("pending", "completed"),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("tasks");
};
