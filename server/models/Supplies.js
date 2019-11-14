const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  let Supplies = sequelize.define("Supplies", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    description: Sequelize.TEXT,
    items: {
      type: Sequelize.INTEGER(11),
      defaultValue: null
    },
    value: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    ref_provider: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: {
          tableName: "suppliers"
        },
        key: "id"
      }
    },
    status: { type: Sequelize.BOOLEAN(), defaultValue: 1 }
  });
  // Supplies.associate = function(models) {
  //   Supplies.hasMany(models.Suppliers, {
  //     foreignKey: {
  //       name: "ref_provider",
  //       allowNull: false
  //     }
  //   });
  // };
  return Supplies;
};
