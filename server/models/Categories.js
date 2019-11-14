const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    categoryName: {
      type: Sequelize.CHAR(200),
      allowNull: false
    },
    categoryDescription: Sequelize.TEXT,
    status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },
    parent_ref_id: { type: Sequelize.INTEGER(11), defaultValue: 0 }
  });
  return Categories;
};
