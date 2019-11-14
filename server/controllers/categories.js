const db = require("../db/connection");
const Categories = require("../models/").Categories;

module.exports = {
  getAll: () => {
    // let query = "Select * from `categories` where status = 1 ";
    return new Promise((resolve, reject) => {
      Categories.findAll()
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
      // db.query(query, (err, result) => {
      //   if (err) reject("error", err);
      //   resolve(result);
      // });
    });
  },
  add: data => {
    // let query = `Insert INTO categories (categoryName, categoryDescription, parent_ref_id) Values (\'${
    //   data.categoryName
    // }\', \'${data.categoryDescription}\', \'${data.parentCategory}\')`;
    return new Promise((resolve, reject) => {
      Categories.create(
        _.pick(data, ["categoryName", "categoryDescription", "parent_ref_id", "tax", "discount"])
      )
        .then(res => {
          if (res) {
            Categories.findAll({
              where: {
                status: true
              }
            }).then(responce => {
              resolve(responce);
            }).catch(err => {
              reject(err);
            })
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  get: data => {
    let query = `Select * From categories WHERE id = ${data}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  },
  edit: (data, param) => {
    let query = `Update categories SET categoryName=\'${
      data.categoryName
      }\',categoryDescription=\'${data.categoryDescription}\',parent_ref_id=\'${
      data.parentCategory
      }\',updatedAt=\'${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}\' WHERE id = ${param};`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        }
        resolve(result);
      });
    });
  },
  delete: params => {
    let query = `Delete FROM categories Where id=${params}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        }
        resolve(result);
      });
    });
  },
  find: input => {
    let query = `SELECT * FROM categories WHERE categoryName LIKE \'%${input}%\'`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  }
};
