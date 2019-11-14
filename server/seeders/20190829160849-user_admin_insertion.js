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


    return queryInterface.bulkInsert('users', [{
      username: 'admin',
      name:"Numan Ashiq",
      email:"numanash@yahoo.com",
      password:"$2b$10$T.igFBmOtMqgLFIIVv38A.vIWJLDcYHaVn/kkcnQgpJBxEbYSSZ/m"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

   return queryInterface.bulkDelete('users', null, {});
  }
};
