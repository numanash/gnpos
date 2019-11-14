const db = require("../db/connection");
const Customers = require("../models/").Customers;
module.exports = {
  getAll: () => {
    // let query = "Select * from `customers` ";
    return new Promise((resolve, reject) => {
      Customers.findAll({ where: { status: 1 } })
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
    // let query = `Insert INTO customers (name, email, phone, city, address, description) Values (\'${
    //   data.name
    // }\', \'${data.email}\', \'${data.phone}\', \'${data.city}\',\'${
    //   data.address
    // }\',\'${data.description}\')`;

    return new Promise((resolve, reject) => {
      // db.query(query, (err, result) => {
      //   if (err) {
      //   } else {
      //   }
      // });
      Customers.create(
        _.pick(data, [
          "name",
          "email",
          "phone",
          "description",
          "address",
          "city"
        ])
      )
        .then(res => {
          console.log({ res });
          resolve(res);
        })
        .catch(e => {
          console.log({ e });
          reject(e);
        });
    });
  },
  get: data => {
    let query = `Select * From customers WHERE id = ${data}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  },
  edit: (data, param) => {
    let query = `Update customers SET name=\'${data.name}\',phone=\'${
      data.phone
    }\',email=\'${data.email}\',city=\'${data.city}\',address=\'${
      data.address
    }\',description=\'${data.description}\' WHERE id = ${param};`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err.sqlMessage);
        }
        resolve(result);
      });
    });
  },
  delete: params => {
    return new Promise((resolve, reject) => {
      Customers.update(
        { status: 0 },
        {
          where: {
            id: params
          }
        }
      )
        .then(res => {
          reject(res);
        })
        .catch(e => {
          console.log({ deleteError: e });
          reject(e);
        });
    });
    // let query = `Delete FROM customers Where id=${params}`;

    //   db.query(query, (err, result) => {
    //     if (err) {
    //       reject(err.sqlMessage);
    //     }
    //     resolve(result);
    //   });
    // });
  },
  find: input => {
    let query = `SELECT * FROM customers WHERE name LIKE \'%${input}%\'`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err.sqlMessage);
        resolve(result);
      });
    });
  }
};
