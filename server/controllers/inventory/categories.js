const db = require("../../db/connection");
const Categories = require("../../models").Categories;

module.exports = {
  getAll: query => {
    // let query = "Select * from `categories` where status = 1 ";

    return new Promise((resolve, reject) => {
      if (query.limit) {
        Categories.findAndCountAll({
          limit: parseInt(query.limit),
          offset: parseInt(query.offset),
          order: [[query.column, query.order]]
        })
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      } else {
        Categories.findAll({
          where: {
            parent_ref_id: 0
          }
        })
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      }
      // db.query(query, (err, result) => {
      //   if (err) reject("error", err);
      //   resolve(result);
      // });
    });
  },
  getSubCategories: id => {
    return new Promise((resolve, reject) => {
      Categories.findAll({
        where: { parent_ref_id: id }
      })
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e.original.sqlMessage);
        });
    });
  },
  add: data => {
    // let query = `Insert INTO categories (categoryName, categoryDescription, parent_ref_id) Values (\'${
    //   data.categoryName
    // }\', \'${data.categoryDescription}\', \'${data.parentCategory}\')`;
    return new Promise((resolve, reject) => {
      Categories.create(
        _.pick(data, [
          "categoryName",
          "categoryDescription",
          "parent_ref_id",
          "tax",
          "discount"
        ])
      )
        .then(res => {
          if (res) {
            Categories.findAll({
              where: {
                status: true
              }
            })
              .then(responce => {
                resolve(responce);
              })
              .catch(err => {
                console.log({ err });
                reject(err);
              });
          }
        })
        .catch(e => {
          if (e.original.code === "ER_DUP_ENTRY") {
            return reject(e.original.sqlMessage);
          }
          reject(e.original.sqlMessage);
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
  delete: id => {
    return new Promise((resolve, reject) => {
      Categories.destroy({
        where: {
          id
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
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
