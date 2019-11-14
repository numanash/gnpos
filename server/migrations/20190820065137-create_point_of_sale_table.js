"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("point_of_sale", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: Sequelize.CHAR(200),
      description: Sequelize.CHAR(200),
      code: {
        type: Sequelize.CHAR(255),
        unique: true
      },
      total_items: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      ref_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: {
            tableName: "customers"
          },
          key: "id"
        }
      },
      payment_type: {
        type: Sequelize.CHAR(30),
        allowNull: false
      },
      total_received: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      discount_in_cash: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      discount_type: {
        type: Sequelize.CHAR(11),
        allowNull: false
      },
      discount_percent: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      total_payable: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      customer_pay: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      customer_return: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      order_status: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable("point_of_sale");
  }
};
