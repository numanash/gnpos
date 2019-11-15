const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const users = require("../controllers/users");
const auth = require("../middleware/auth");
const inRoles = require("../middleware/inRoles");

// router.get("/", [auth, inRoles(["admin"])], async (req, res) => {
router.get("/", async (req, res) => {
  await users
    .getAll()
    .then(result => {
      res.status(200).send({ data: result });
    })
    .catch(err => console.log(err));
});

// router.get("/edit/:id", [auth, inRoles(["admin"])], async (req, res) => {
router.get("/edit/:id", async (req, res) => {
  await users
    .getUser(parseInt(req.params.id))
    .then(result => res.status(200).send({ data: result[0] }))
    .catch(ex => console.log(ex));
});

router.put("/edit/:id", [auth, inRoles(["admin"])], async (req, res) => {
  await users
    .updateUser(parseInt(req.params.id), req.body)
    .then(result => res.status(200).send({ message: "User Updated" }))
    .catch(ex => console.log(ex));
});

router.post("/add", [auth, inRoles(["admin"])], async (req, res) => {
  let user = req.body;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await users
    .register(user)
    .then(result => {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          isAuthenticated: true,
          _id: user.id
        },
        config.get("gn_pos_key")
      );
      res
        .status(201)
        .header("x-auth-token", token)
        .send({
          message: `New User : ${user.name}/ Email: ${user.email} Added`
        });
    })
    .catch(e => {
      if (e.code === "ER_DUP_ENTRY") {
        res.status(303).send({ message: "Email Already Exists!" });
      } else {
        console.log(e.sqlMessage);
        res.status(404).send({ message: "Internal Server Error" });
      }
    });
});

router.post("/login", async (req, res) => {
  let user = req.body;
  await users
    .login(user)
    .then(async result => {
      if (!result)
        res.status(404).send({ message: "Invalid Email or Password" });
      const validatePassword = await bcrypt.compare(
        user.password,
        result.password
      );

      if (!validatePassword) {
        res.status(404).send({ message: "Invalid Email or Password" });
      }
      user = result;


      const roles = await users
        .getRoles(user.id)
        .then(result => result[0])
        .catch(ex => console.log(ex));
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          isAuthenticated: true,
          _id: user.id,
        },
        config.get("gn_pos_key")
      );


      return res
        .header("x-auth-token", token)
        .status(200)
        .send({
          name: user.name,
          token,
          roles: roles,
          isAuthenticated: true
        });
    })
    .catch(e => {
      console.log(e);
      if (e.code === "ER_DUP_ENTRY") {
        return res.status(404).send("Email Already Exists!");
      } else if (e.message) {
        return res.status(403).send(e);
      } else {
        return res.status(404).send({ message: e });
      }
    });
});


router.get("/getUserActions", auth, async (req, res) => {
  await users
    .getActions(req.user.s)
    .then(result => res.status(200).send(result[0].actions))
    .catch(ex => console.log(ex));
});
router.post("/add-actions", auth, async (req, res) => {
  let user = req.body;
  await users
    .login(user)
    .then(async result => {
      const validatePassword = await bcrypt.compare(
        user.password,
        result[0].password
      );

      if (!validatePassword) {
        res.status(404).send({ message: "Invalid Email or Password" });
      }
      user = result[0];
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          isAuthenticated: true,
          _id: user.id,
          roleId: user.roleId
        },
        config.get("gn_pos_key")
      );

      return res
        .header("x-auth-token", token)
        .status(200)
        .send({
          name: user.name,
          token,
          isAuthenticated: true
        });
      // res.status(200).send(user);
    })
    .catch(e => {
      console.log(e);
      if (e.code === "ER_DUP_ENTRY") {
        return res.status(404).send("Email Already Exists!");
      } else if (e.message) {
        return res.status(403).send(e);
      } else {
        return res.status(404).send({ message: e });
      }
    });
});

router.get("/getUserRoles", auth, async (req, res) => {
  await users
    .getRoles(req.user._id)
    .then(result => res.status(200).send(result[0]))
    .catch(ex => console.log(ex));
});

router.get("/getAllRoles", [auth, inRoles(["admin"])], async (req, res) => {
  await users
    .getAllRoles()
    .then(result => res.status(200).send(result))
    .catch(ex => {
      console.log(ex);
      return res.status(500).send({ message: "Internal Server Error!" });
    });
});

module.exports = router;
