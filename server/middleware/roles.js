const user = require("../controllers/users");

module.exports = async function(req, res, next) {
  if (!req.user)
    return res.status(401).send("Access denied. Please login first");
  const actions = await user
    .getActions(req.user.roleId)
    .then(response => response[0].actions)
    .catch(ex => {
      console.log({ ex });
      return res
        .status(401)
        .send({ message: "Something went wrong on Server" });
    });

  const actionsArr = actions.split(",");
  if (!actionsArr.includes(req.path)) {
    return res.status(401).send("Access denied. You are not allowed");
  }
  next();
};
