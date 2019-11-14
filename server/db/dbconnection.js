const Sequalize = require("sequelize");

const sequelize = new Sequalize("gn_pos", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  operateAliases: false
});

module.exports = sequelize;
global.sequelize = sequelize;
