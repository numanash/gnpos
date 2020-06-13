const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  let ProductStockFlow = sequelize.define(
    "products_stock_flow",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ref_product_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: {
            tableName: "products"
          },
          key: "id"
        },
        defaultValue: 0
      },
      ref_product_code: {
        type: Sequelize.CHAR,
        foreignKey: true,
        references: {
          model: {
            tableName: "products"
          },
          key: "barcode"
        },
        defaultValue: null
      },
      quantity_before: {
        type: Sequelize.INTEGER(11),
        allowNull: 0
      },
      quantity: {
        type: Sequelize.INTEGER(11),
        allowNull: 0
      },
      quantity_after: {
        type: Sequelize.INTEGER(11),
        allowNull: 0
      },
      ref_pos_code: {
        type: Sequelize.CHAR(255),
        foreignKey: true,
        references: {
          model: {
            tableName: "point_of_sale"
          },
          key: "code"
        },
        defaultValue: null
      },
      type: {
        type: Sequelize.CHAR(200),
        allowNull: false
      },
      unit_price: {
        type: Sequelize.FLOAT(),
        allowNull: 0
      },
      total_price: {
        type: Sequelize.FLOAT(),
        allowNull: 0
      },
      ref_supplier: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        foreignKey: true,
        references: {
          model: {
            tableName: "suppliers"
          },
          key: "id"
        }
      },
      ref_supply: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        foreignKey: true,
        references: {
          model: {
            tableName: "supplies"
          },
          key: "id"
        }
      },
      description: Sequelize.TEXT,
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 }
    },
    { tableName: "product_stock_flow", paranoid: true }
  );
  return ProductStockFlow;
};
