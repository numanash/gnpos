const db = require("../db/connection");
const Customers = require("../models/").Customers;
module.exports = {
  getAll: query => {
    // let query = "Select * from `customers` ";
    return new Promise((resolve, reject) => {
      if (query.limit) {
        Customers.findAll({
          where: { status: 1 },
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
        Customers.findAll({ where: { status: 1 } })
          .then(res => {
            console.log({ res });
            resolve(res);
          })
          .catch(e => {
            console.log({ e });
            reject(e);
          });
        // db.query(query, (err, result) => {
        //   if (err) reject("error", err);
        //   resolve(result);
        // });
      }
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
  get: id => {
    return new Promise((resolve, reject) => {
      Customers.findAll({
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
  edit: (data, id) => {
    console.log({ data, id });
    return new Promise((resolve, reject) => {
      Customers.update(
        _.pick(data, [
          "name",
          "phone",
          "email",
          "address",
          "city",
          "description"
        ]),
        {
          where: {
            id
          }
        }
      )
        .then(res => {
          console.log({ res });
          resolve(res);
        })
        .catch(err => {
          console.log({ err });
          resolve(err);
        });
    });
  },
  delete: id => {
    return new Promise((resolve, reject) => {
      Customers.destroy({
        where: {
          id
        }
      })
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
