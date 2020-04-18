"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "categories",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        categoryName: {
          type: Sequelize.CHAR(200),
          allowNull: false,
          unqiue: "category"
        },
        categoryDescription: Sequelize.TEXT,
        status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },
        parent_ref_id: { type: Sequelize.INTEGER(11), defaultValue: 0 },
        tax: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        discount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
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
        deletedAt: {
          type: Sequelize.DATE,
          defaultValue: null
        }
      },
      {
        uniqueKeys: {
          category: {
            fields: ["categoryName"]
          }
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("categories");
  }
};
