"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("roles", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      role_name: {
        type: Sequelize.CHAR(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter role name"
          }
        }
      },
      role_description: {
        type: Sequelize.CHAR(250),
        defaultValue: null
      },
      role_privileges: Sequelize.BLOB,
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
    return queryInterface.dropTable("roles");
  }
};
