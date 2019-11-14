const db = require("../db/connection");
const Supplies = require("../models/").Supplies;
const Products = require("../models/").Products;
const Suppliers = require("../models/").Suppliers;

const ProductStockFlow = require("../models/").ProductStockFlow;

module.exports = {
  getAll: () => {


    return new Promise((resolve, reject) => {


      // Supplies.hasMany(Suppliers, {
      //   foreignKey: "id"
      // });
      // Suppliers.belongsTo(Supplies, {
      //   foreignKey: "ref_provider",
      //   targetKey: "id"
      // });
      // Supplies.findAll({
      //   as: "Supplies",
      //   raw: true,
      //   include: [
      //     {
      //       model: Suppliers,
      //       nested: true,
      //       all: true,
      //       as: "Suppliers",
      //       attributes: ["name"],
      //       on: {
      //         id: Sequelize.col("Supplies.ref_provider")
      //       },
      //       where: {
      //         status: 1
      //       }
      //     }
      //   ]
      // })

      sequelize
        .query(
          `Select sup.*,supp.name as provider from supplies sup INNER JOIN suppliers supp ON sup.ref_provider = supp.id `,
          {
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            plain: false
          }
        )
        .then(res => {
          console.log({ res });
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  add: async (data, products) => {
    return new Promise((resolve, reject) => {
      return sequelize.transaction().then(t => {
        return Supplies.create(
          _.pick(data, ["description", "value", "items", "ref_provider"]),
          { transaction: t }
        )
          .then(supply => {
            products.map((product, index) => {
              return Products.findOne({ where: { id: product.id } }).then(
                pro => {
                  return Products.update(
                    {
                      purchase_cost: product.purchasePrice,
                      quantity: pro.quantity + product.quantity
                    },
                    { where: { id: product.id }, transaction: t }
                  ).then(proUpdate => {
                    return ProductStockFlow.create(
                      {
                        ref_product_id: pro.id,
                        ref_product_code: pro.barcode,
                        quantity_before: pro.quantity,
                        quantity: product.quantity,
                        quantity_after: pro.quantity + product.quantity,
                        type: "supply",
                        unit_price: product.purchasePrice,
                        total_price: product.purchasePrice * product.quantity,
                        ref_supplier: data.ref_provider,
                        ref_supply: supply.id
                      },
                      { transaction: t }
                    ).then(res => {
                      resolve(res);
                      if (index === products.length - 1) {
                        return t.commit();
                      }
                    });
                  });
                }
              );
            });
          })
          .catch(SupplyError => {
            reject(SupplyError);
            return t.rollback();
          });
      });
    });
  },
  get: id => {
    ProductStockFlow.hasMany(Products, {
      foreignKey: "id"
    });
    // Products.belongsTo(ProductStockFlow, {
    //   foreignKey: "ref_product_id",
    //   targetKey: "id"
    // });
    console.log({ id });
    return new Promise((resolve, rejcet) => {
      sequelize
        .query(
          `SELECT psf.*,p.name,p.id,p.barcode from product_stock_flow psf  INNER JOIN products p ON p.id=psf.ref_product_id AND p.status = '1' WHERE ref_supply = '${id}' AND type = 'supply'`,
          {
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            plain: false
          }
        )
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(error => {
          console.log({ error });
          rejcet(error);
        });
      // ProductStockFlow.findAll({
      //   as: "ProductStockFlow",
      //   // raw: true,
      //   include: [
      //     {
      //       model: Products,
      //       nested: true,
      //       all: true,
      //       as: "Products",
      //       attributes: ["name", "id", "barcode"],
      //       on: {
      //         id: Sequelize.col("ProductStockFlow.ref_product_id")
      //       },
      //       where: {
      //         status: 1
      //       }
      //     }
      //   ],
      //   where: { ref_supply: id, type: "supply" }
      // })
    });
  },
  getSignle: id => {
    let query = "Select sup.*,";
  },
  edit: (data, param) => {
    let query = `Update  SET Name=\'${data.Name}\',Description=\'${
      data.Description
      }\',parent=\'${data.parent}\' WHERE id=${param}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  delete: params => {
    let query = `Delete FROM supplies Where id=${params}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  find: input => {
    let query = `SELECT * FROM supplies WHERE Name LIKE \'%${input}%\'`;
    console.log(query);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(new Error(err));

        resolve(result);
      });
    });
  },
  addInStock: data => {
    let query = "Insert INTO";
  }
};
