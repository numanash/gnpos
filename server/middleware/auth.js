const jwt = require("jsonwebtoken");
const config = require("config");
const users = require("../controllers/users");

module.exports = function (req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) token = req.body.token;
  // const tokens = req.cookies['token-api'];
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {

    const decoded = jwt.verify(token.replace('gnposauth', ''), config.get("gn_pos_key"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token");
  }
};
