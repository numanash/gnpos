const db = require("../db/connection");
const Users = require("../models").users;
const Roles = require("../models/Roles");
const UserRoles = require("../models").user_roles;

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      Users.findAll()
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
      // db.query(
      //   "Select u.name as name,u.id as id, u.email as email , GROUP_CONCAT(r.role_name) as roles, u.createdAt as createdAt from users u JOIN user_roles ur JOIN roles r ON u.id = ur.user_id AND r.id = ur.role_id GROUP BY u.id  ",
      //   (err, result) => {
      //     if (err) {
      //       reject(err);
      //     }
      //     resolve(result);
      //   }
      // );
    });
  },
  getUser: id => {
    return new Promise((resolve, reject) => {
      // Users.hasMany(Roles, { as: "Roles" });
      // Users.hasMany(UserRoles, { as: "UserRoles" });
      // Users.findOne({
      //   where: { id: id },
      //   attributes: ["name", "email", "id"],
      //   include: [
      //     {
      //       model: UserRoles,
      //       where: { id: "user_roles.user_id" },
      //       as: "UserRoles"
      //     },
      //     {
      //       model: Roles,
      //       where: { id: "user_roles.role_id" },
      //       as: "Roles",
      //       attributes: [
      //         "id",
      //         [
      //           sequelize.fn("GROUP_CONCAT", sequelize.col("Roles.role_name")),
      //           "roles"
      //         ]
      //       ]
      //     }
      //   ]
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
      db.query(
        `SELECT users.name, users.email, users.id, GROUP_CONCAT(roles.role_name) as roles FROM users INNER JOIN user_roles on users.id = user_roles.user_id INNER JOIN roles ON roles.id = user_roles.role_id where users.id = ${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  updateUser: (id, user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `Update users SET name='${user.name}', email='${user.email}' where users.id = ${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  register: user => {
    console.log({ user });
    return new Promise((resolve, reject) => {
      Users.create({
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password
      });
      Users.afterCreate((addedUser, options) => {
        UserRoles.create({
          user_id: addedUser.id,
          role_id: user.role
        })
          .then(rolesAdded => {
            resolve(rolesAdded);
          })
          .catch(e => {
            reject(e);
          });
      });

      // db.query(
      //   `INSERT INTO users(email, name, password) VALUES ('${user.email}','${
      //     user.name
      //   }','${user.password}');`,
      //   (err, result) => {
      //     if (err) {
      //       reject(err);
      //       console.log(err);
      //     }
      //     if (result) {
      //       db.query(
      //         `Insert Into user_roles(user_id,role_id) Values(${
      //           result.insertId
      //         },${parseInt(user.role)})`,
      //         (error, result2) => {
      //           if (err) {
      //             reject(err);
      //             console.log(err);
      //           }
      //           resolve(result2);
      //         }
      //       );
      //     }
      //   }
      // );
    });
  },
  login: user => {
    // let query = `Select * from users WHERE email = '${user.email}'`;
    return new Promise((resolve, reject) => {
      Users.findOne({ where: { email: user.email } })
        .then(res => resolve(res))
        .catch(e => reject(e));

      // db.query(query, (err, result) => {
      //   if (err) {
      //     reject(err.sqlMessage);
      //   }
      //   if (result) {
      //     if (result.length === 0) {
      //       reject({ message: "Invalid User or Password" });
      //     } else {
      //       resolve(result);
      //     }
      //   }
      // });
    });
  },
  getRoles: id => {
    let query = `Select GROUP_CONCAT(role_name) as roleName from user_roles ur JOIN roles r ON ur.user_id = ${id} AND ur.role_id = r.id GROUP BY ur.user_id`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject({ err });
        resolve(result);
      });
    });
  },
  getAllRoles: () => {
    let query = `Select * from roles`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  getActions: roleId => {
    let query = `Select GROUP_CONCAT(action_name) as actions,role_id,action_id from permissions p JOIN user_actions ua ON p.role_id = ${roleId} AND p.action_id = ua.id GROUP BY p.role_id`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject({ err });
        resolve(result);
      });
    });
  },
  addUserActions: () => {
    let query = "Insert Into action";
  },
  edit: (data, param) => {
    let query = `UPDATE products SET name='${data.name}', ref_category='${data.ref_category}', selling_price='${data.selling_price}', description='${data.description}', sku='${data.sku}', status='${data.status}', selling_price_TTC_all_taxes_included='${data.selling_price_TTC_all_taxes_included}',weight='${data.weight}',height='${data.height}',width='${data.width}',colour='${data.colour}',codebar='${data.codebar}' WHERE id=${param}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  delete: params => {
    console.log(params);
    let query = `Delete FROM category Where id=${params}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  }
};
