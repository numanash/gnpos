const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Customers = sequelize.define("Customers", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    phone: Sequelize.STRING(30),
    email: {
      type: Sequelize.CHAR(55)
    },
    description: Sequelize.TEXT,
    date_of_birth: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    city: {
      type: Sequelize.CHAR(55),
      defaultValue: null
    },
    post_code: Sequelize.CHAR(200),
    country: Sequelize.CHAR(200),
    company_name: Sequelize.CHAR(200),
    status: { type: Sequelize.BOOLEAN(), defaultValue: 1 }
  });
  return Customers;
};
