"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "supplies",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unqiue: "supply"
        },
        description: Sequelize.TEXT,
        items: {
          type: Sequelize.INTEGER(11),
          defaultValue: 0
        },
        value: {
          type: Sequelize.FLOAT,
          defaultValue: 0
        },
        ref_provider: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          defaultValue: null,
          references: {
            model: {
              tableName: "suppliers"
            },
            key: "id"
          }
        },
        status: { type: Sequelize.BOOLEAN(), defaultValue: 1 },
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
          type: "TIMESTAMP",
          allowNull: true,
          defaultValue: null
        }
      },
      {
        uniqueKeys: {
          supply: {
            fields: ["name"]
          }
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("supplies");
  }
};
