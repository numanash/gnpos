const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let Suppliers = sequelize.define("Suppliers", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.CHAR(55),
      allowNull: false
    },
    phone: {
      type: Sequelize.CHAR(30),
      allowNull: false
    },
    email: {
      type: Sequelize.CHAR(55),
      defaultValue: null
    },
    description: {
      type: Sequelize.TEXT
    },
    status: { type: Sequelize.BOOLEAN(), defaultValue: 1 }
  });

  // Suppliers.associate = models => {
  //   Suppliers.belongsTo(models.Supplies);
  // };
  return Suppliers;
};
