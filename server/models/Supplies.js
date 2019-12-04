const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let Supplies = sequelize.define("Supplies", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: Sequelize.TEXT,
    items: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0
    },
    value: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    ref_provider: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      defaultValue: null,
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
