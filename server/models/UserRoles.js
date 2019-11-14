const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let UserRoles = sequelize.define("UserRoles", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: {
          tableName: "roles"
        },
        key: "id"
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      foreignKey: true,
      references: {
        model: {
          tableName: "users"
        },
        key: "id"
      }
    }
  }, { tableName: "user_roles", timestamps: false });
  return UserRoles;
};
