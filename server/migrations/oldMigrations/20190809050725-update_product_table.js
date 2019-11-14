"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([
      queryInterface.addColumn("products", "service_charges", {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
      queryInterface.addColumn("products", "tax", {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
      queryInterface.addColumn("products", "discount", {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
