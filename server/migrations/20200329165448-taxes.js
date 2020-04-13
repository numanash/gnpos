'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('taxes',{
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.CHAR(255),
      allowNull: false
    },
    type:{
      type: Sequelize.ENUM('Percentage', 'Cash'),
      defaultValue: 'Cash',
      allowNull: false
    },
    value:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description:{
      type: Sequelize.TEXT,
      allowNull: true
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
   })
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
