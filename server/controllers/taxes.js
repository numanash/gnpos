const db = require("../db/connection");
const Taxes = require("../models").Taxes;

module.exports = {
  getAll: query => {
    // let query = "Select * from `Taxes` where status = 1 ";

    return new Promise((resolve, reject) => {
      if (query.limit) {
        Taxes.findAndCountAll({
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
        Taxes.findAll()
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
  getSubTaxes: id => {
    return new Promise((resolve, reject) => {
      Taxes.findAll({
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
    // let query = `Insert INTO Taxes (categoryName, categoryDescription, parent_ref_id) Values (\'${
    //   data.categoryName
    // }\', \'${data.categoryDescription}\', \'${data.parentCategory}\')`;
    return new Promise((resolve, reject) => {
      Taxes.create(_.pick(data, ["name", "description", "type", "value"]))
        .then(res => {
          if (res) {
            Taxes.findAll()
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
    let query = `Select * From Taxes WHERE id = ${data}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  },
  edit: (data, param) => {
    let query = `Update Taxes SET name=\'${data.name}\',description=\'${
      data.description
    }\',value=\'${data.value}\',type=\'${data.type}\',updatedAt=\'${new Date()
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
    console.log({ id });
    return new Promise((resolve, reject) => {
      Taxes.destroy({
        where: {
          id
        }
      })
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log({ err });
          reject(err);
        });
    });
  },
  find: input => {
    let query = `SELECT * FROM Taxes WHERE categoryName LIKE \'%${input}%\'`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  }
};
