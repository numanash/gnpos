const config = require("config");

module.exports = function() {
  if (!config.get("gn_pos_key")) {
    throw new Error("FATAL ERROR: gn_pos_key is not defined.");
  }
};
