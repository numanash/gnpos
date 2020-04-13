"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
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
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false
      },
      deletedAt:{
        type: "TIMESTAMP",
        allowNull: true
      }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
