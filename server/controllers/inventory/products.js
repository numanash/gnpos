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
  getByCategory: categoryId => {
    return new Promise((resolve, reject) => {
      Products.findAll({
        attributes: ["name", "barcode", "id", "sku", "purchase_cost", "selling_price"],
        where: {
          ref_category: categoryId
        }
      }).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
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
          attributes: ["name", "barcode", "id", "sku", "purchase_cost", "selling_price"]
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
  get: id => {
    return new Promise((resolve, reject) => {
      Products.findAll({
        where: {
          id
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })

  },
  edit: (data, param) => {
    return new Promise((resolve, reject) => {
      Products.update(_.pick(data, [
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
      ]), {
        where: {
          id: data.id
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delete: params => {
    let query = `Delete FROM category Where id=${params}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  }
};
