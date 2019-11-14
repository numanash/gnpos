'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('roles', [{
      role_name: 'super_admin',
      role_description: 'Have access to all modules'
    }, {
      role_name: 'admin',
      role_description: 'Have access to almost all modules'
    }, {
      role_name: 'tester',
      role_description: 'Tester'
    }, {
      role_name: 'store_manager',
      role_description: 'Can view and Add things cannot change'
    }, {
      role_name: 'cashier',
      role_description: 'Can add orders'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('roles', null, {});
  }
};
