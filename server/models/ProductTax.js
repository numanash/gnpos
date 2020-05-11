const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  let ProductTax = sequelize.define(
    "ProductTax",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: {
            tableName: "products"
          },
          key: "id"
        }
      },
      tax_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: {
            tableName: "tax"
          },
          key: "id"
        }
      }
    },
    { tableName: "product_tax", timestamps: false }
  );
  return ProductTax;
};
