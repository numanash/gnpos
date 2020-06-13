// `id` int(11) NOT NULL,
//   `role_name` varchar(100) NOT NULL,
//   `role_description` varchar(250) DEFAULT NULL,
//   `role_privileges` blob
const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  let Roles = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      role_name: {
        type: Sequelize.CHAR(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter role name"
          }
        }
      },
      role_description: {
        type: Sequelize.CHAR(250),
        defaultValue: null
      },
      role_privileges: Sequelize.BLOB,
      status: { type: Sequelize.BOOLEAN(), defaultValue: 1 }
    },
    {
      paranoid: true
    }
  );
  Roles.association = function(models) {
    Roles.belongsTo(models.Users);
  };
  return Roles;
};
