const user = require("../controllers/users");

module.exports = function(hasRole) {
  return async function(req, res, next) {
    if (!req.user)
      return res.status(401).send("Access denied. Please login first");
    const roles = await user
      .getRoles(req.user._id)
      .then(response => response[0].roleName)
      .catch(ex => {
        console.log({ ex });
        return res
          .status(401)
          .send({ message: "Something went wrong on Server" });
      });

    let rolesArr = roles.split(",");
    let newRolesArr = new Array();
    rolesArr.forEach(rA1 =>
      hasRole.forEach(rA2 => {
        if (rA1 === rA2) {
          newRolesArr.push(rA1);
        }
      })
    );
    if (newRolesArr.length === 0) {
      return res.status(401).send("Access denied. You are not allowed");
    }
    next();
  };
};
