const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.CHAR(55),
      allowNull: true,
      defaultValue: null
    },
    name: {
      type: Sequelize.CHAR(100),
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: Sequelize.CHAR(100),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.CHAR(100),
      allowNull: false
    },
    ip_address: {
      type: Sequelize.INTEGER(11),
      defaultValue: null
    },
    banned: {
      type: Sequelize.TINYINT(1),
      defaultValue: null
    },
    last_login: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    last_login_attempt: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    remember_time: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    remember_exp: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    verification_code: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  },{
    paranoid: true
  });
  Users.association = function(models) {
    Users.hasMany(models.Roles);
  };
  return Users;
};
