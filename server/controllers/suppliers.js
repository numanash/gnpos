const db = require("../db/connection");
const Suppliers = require("../models/").Suppliers;
module.exports = {
  getAll: (query) => {
    return new Promise((resolve, reject) => {
      if (query.limit) {
        Suppliers.findAndCountAll({
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
        Suppliers.findAll().then(res => {
          resolve(res);
        })
          .catch(e => {
            reject(e);
          });
      }


    });
  },
  add: data => {
    // let query = `Insert INTO suppliers (name, email, phone, description) Values (\'${
    //   data.name
    // }\', \'${data.email}\', \'${data.phone}\', \'${data.description}\')`;
    return new Promise((resolve, reject) => {
      Suppliers.create(_.pick(data, ["name", "email", "phone", "description"]))
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          console.log({ Supplierserror: e });
          reject(e);
        });
      // db.query(query, (err, result) => {
      //   if (err) {
      //     reject(err.sqlMessage);
      //   } else {
      //     resolve(result);
      //   }
      // });
    });
  },
  get: data => {
    let query = `Select * From suppliers WHERE id = ${data}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  edit: (data, param) => {
    let query = `Update suppliers SET name=\'${data.name}\',email=\'${
      data.email
      }\',phone=\'${data.phone}\',description=\'${
      data.description
      }\' WHERE id=${param}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  },
  delete: params => {
    let query = `Delete FROM suppliers Where id=${params}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  },
  find: input => {
    let query = `SELECT * FROM suppliers WHERE name LIKE \'%${input}%\'`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(new Error(err));

        resolve(result);
      });
    });
  }
};
