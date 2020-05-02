"use strict";

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

    return queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          name: "Numan Ashiq",
          email: "mnuman2772@gmail.com",
          password:
            "$2b$10$LG3DdRDnjOe3Nwbmlgsl0uIi6RdAxmyrrhtfzRevGpb2Af/9rzZA2"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete("users", null, {});
  }
};
