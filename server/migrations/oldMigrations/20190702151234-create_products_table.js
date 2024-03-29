"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.CHAR(255),
        allowNull: false
      },
      ref_category: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      sku: {
        type: Sequelize.CHAR(255),
        allowNull: false
      },
      quantity_remaining: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      quantity_sold: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      defective_piece: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      purchase_cost: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      selling_price: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      selling_price_TTC_all_taxes_included: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      fictitious_price: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      weight: {
        defaultValue: null,
        type: Sequelize.CHAR(255)
      },
      colour: {
        defaultValue: null,
        type: Sequelize.CHAR(255)
      },
      height: {
        defaultValue: null,
        type: Sequelize.CHAR(255)
      },
      width: {
        defaultValue: null,
        type: Sequelize.CHAR(255)
      },
      promotional_price: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      promotional_start_price: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      promotional_end_date: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      barcode: {
        type: Sequelize.CHAR(11),
        unique: true
      },
      product_status: {
        type: Sequelize.BOOLEAN(1),
        defaultValue: 1,
        allowNull: false
      },
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },
      image: { type: Sequelize.CHAR(255), allowNull: true },
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
    return queryInterface.dropTable("products");
  }
};
