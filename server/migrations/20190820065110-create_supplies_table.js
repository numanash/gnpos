"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("supplies", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      description: Sequelize.TEXT,
      items: {
        type: Sequelize.INTEGER(11),
        defaultValue: null
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      ref_provider: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: {
            tableName: "suppliers"
          },
          key: "id"
        }
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
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("supplies");
  }
};
