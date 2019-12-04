const db = require("../../db/connection");
const Products = require("../../models").Products;
module.exports = {
  getAll: (query) => {
    return new Promise((resolve, reject) => {
      if (query.limit) {
        Products.findAndCountAll({
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
        Products.findAll().then(res => {
          resolve(res);
        })
          .catch(e => {
            reject(e);
          });
      }
    });
  },
  add: data => {
    return new Promise((resolve, reject) => {
      Products.create(
        _.pick(data, [
          "name",
          "ref_category",
          "selling_price",
          "description",
          "sku",
          "product_status",
          "weight",
          "height",
          "width",
          "colour",
          "barcode",
          "tax",
          "service_charges",
          "discount"
        ])
      )
        .then(result => {
          resolve(result);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  search: (query) => {
    return new Promise((resolve, reject) => {
      console.log(query);
      if (query.search) {
        const Op = Sequelize.Op;

        Products.findAll({
          limit: query.limit ? parseInt(query.limit) : 5,
          where: {
            [Op.or]: {
              name: { [Op.like]: '%' + query.search + '%' },
              sku: { [Op.like]: '%' + query.search + '%' },
              barcode: { [Op.like]: '%' + query.search + '%' }
            }
          },
          attributes: ["name", "barcode", "id", "sku", "purchase_cost"]
        })
          .then(res => {

            resolve(res);

          })
          .catch(e => {
            reject(e);
          });
      } else {
        reject("Nothing Found")
      }
    });
  },
  get: data => {
    console.log(data);
    let query = `Select * From category WHERE id = ${data}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  edit: (data, param) => {
    let query = `UPDATE products SET name='${data.name}', ref_category='${
      data.ref_category
      }', selling_price='${data.selling_price}', description='${
      data.description
      }', sku='${data.sku}', status='${
      data.status
      }', selling_price_TTC_all_taxes_included='${
      data.selling_price_TTC_all_taxes_included
      }',weight='${data.weight}',height='${data.height}',width='${
      data.width
      }',colour='${data.colour}',codebar='${data.codebar}' WHERE id=${param}`;
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
