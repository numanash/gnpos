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
        allowNull: false,
        unique: true
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
      promotional_start_date: {
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
        type: Sequelize.ENUM('Active', 'De-Active'),
        defaultValue: 'Active',
        allowNull: false
      },
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },

      service_charges: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      tax: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
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
      deletedAt:{
        type: "TIMESTAMP",
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  }
};