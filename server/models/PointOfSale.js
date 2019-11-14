const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  let PointOfSale = sequelize.define(
    "PointOfSale",
    {
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
        unique: true, 
        allowNull:false
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
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },
      order_status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    { tableName: "point_of_sale" }
  );
  return PointOfSale;
};
