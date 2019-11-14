"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ordered_items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      item_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      item_code: {
        type: Sequelize.CHAR(11),
        foreignKey: true,
        references: {
          model: {
            tableName: "products"
          },
          key: "barcode"
        }
      },
      item_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: {
            tableName: "products"
          },
          key: "id"
        }
      },
      item_quantity: {
        type: Sequelize.INTEGER(11)
      },
      order_code: {
        type: Sequelize.CHAR(255),
        allowNull: false,
        foreignKey: true,
        references: {
          model: {
            tableName: "point_of_sale"
          },
          key: "code"
        }
      },
      total_price: {
        type: Sequelize.INTEGER(11),
        allowNull: 0
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
    return queryInterface.dropTable("ordered_items");
  }
};
