const db = require("../../db/connection");
const Products = require("../../models").products;
const Categories = require("../../models").categories;
const ProductStockFlow = require("../../models").product_stock_flow;
const Taxes = require("../../models").taxes;

function isNullOrEmpty(value, returnVal) {
  return value ? value : returnVal;
}
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
  getAll: query => {
    let name = isNullOrEmpty(query.name, "");
    return new Promise((resolve, reject) => {
      if (query.limit) {
        Categories.hasMany(Products, { foreignKey: "id" });
        Products.belongsTo(Categories, { foreignKey: "ref_category" });

        Taxes.hasMany(Products, { foreignKey: "id" });
        Products.belongsTo(Taxes, { foreignKey: "tax" });

        Products.findAndCountAll({
          limit: parseInt(query.limit),
          offset: parseInt(query.offset),
          order: [[query.column, query.order]],
          include: [Categories, Taxes],
          where: {
            name: {
              [Op.like]: `%${name}%`
            }
          }
        })
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      } else {
        Products.findAll()
          .then(res => {
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
        attributes: [
          "name",
          "barcode",
          "id",
          "sku",
          "discount",
          "purchase_cost",
          "selling_price",
          "quantity_remaining",
          "quantity_sold",
          "image"
        ],
        where: {
          ref_category: categoryId
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add: data => {
    console.log({ data });
    return new Promise((resolve, reject) => {
      Products.create(
        _.pick(data, [
          "name",
          "image",
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
  search: query => {
    return new Promise((resolve, reject) => {
      if (query.search) {
        const Op = Sequelize.Op;

        Products.findAll({
          limit: query.limit ? parseInt(query.limit) : 5,
          where: {
            [Op.or]: {
              name: { [Op.like]: "%" + query.search + "%" },
              sku: { [Op.like]: "%" + query.search + "%" },
              barcode: { [Op.like]: "%" + query.search + "%" }
            }
          },
          attributes: [
            "name",
            "barcode",
            "id",
            "sku",
            "purchase_cost",
            "selling_price",
            "quantity_remaining",
            "quantity_sold"
          ]
        })
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      } else {
        reject("Nothing Found");
      }
    });
  },
  get: id => {
    return new Promise((resolve, reject) => {
      Products.findAll({
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
  productStockFlow: (query, id) => {
    return new Promise((resolve, reject) => {
      ProductStockFlow.findAndCountAll({
        limit: parseInt(query.limit),
        offset: parseInt(query.offset),
        order: [[query.column, query.order]],
        where: {
          ref_product_id: id
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
  edit: (data, param) => {
    return new Promise((resolve, reject) => {
      Products.update(
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
        ]),
        {
          where: {
            id: data.id
          }
        }
      )
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete: id => {
    return new Promise((resolve, reject) => {
      Products.destroy({
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
  }
};
