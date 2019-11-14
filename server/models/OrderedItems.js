const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  let OrderedItems = sequelize.define(
    "OrderedItems",
    {
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
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 }
    },
    { tableName: "ordered_items" }
  );
  return OrderedItems;
};
