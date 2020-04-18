"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("suppliers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.CHAR(55),
        allowNull: false
      },
      phone: {
        type: Sequelize.CHAR(30),
        allowNull: false
      },
      email: {
        type: Sequelize.CHAR(55),
        defaultValue: null
      },
      description: {
        type: Sequelize.TEXT
      },
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false
      },
      deletedAt: {
        type: "TIMESTAMP",
        allowNull: true,
        defaultValue: null
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("suppliers");
  }
};
