const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Taxes = sequelize.define("Taxes", {
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
      type:{
        type: Sequelize.ENUM('Percentage', 'Cash'),
        defaultValue: 'Cash',
        allowNull: false
      },
      value:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description:{
        type: Sequelize.CHAR(300),
        allowNull: true
      }
  },{
    paranoid: true
  });
  return Taxes;
};
