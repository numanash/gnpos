const db = require("../../db/connection");
const Supplies = require("../../models").Supplies;
const Products = require("../../models").Products;
const Suppliers = require("../../models").Suppliers;

const ProductStockFlow = require("../../models").ProductStockFlow;

module.exports = {
  getAll: (data) => {


    return new Promise((resolve, reject) => {


      //   // Supplies.hasMany(Suppliers, {
      //   //   foreignKey: "id"
      //   // });
      //   // Suppliers.belongsTo(Supplies, {
      //   //   foreignKey: "ref_provider",
      //   //   targetKey: "id"
      //   // });
      //   // Supplies.findAll({
      //   //   as: "Supplies",
      //   //   raw: true,
      //   //   include: [
      //   //     {
      //   //       model: Suppliers,
      //   //       nested: true,
      //   //       all: true,
      //   //       as: "Suppliers",
      //   //       attributes: ["name"],
      //   //       on: {
      //   //         id: Sequelize.col("Supplies.ref_provider")
      //   //       },
      //   //       where: {
      //   //         status: 1
      //   //       }
      //   //     }
      //   //   ]
      //   // })
      if (data.limit) {
        sequelize
          .query(
            `Select sup.*,supp.name as provider from supplies sup INNER JOIN suppliers supp ON sup.ref_provider = supp.id ORDER BY sup.${data.column} ${data.order} LIMIT ${data.offset}, ${data.limit} `,
            {
              raw: false,
              type: Sequelize.QueryTypes.SELECT,
              plain: false
            }
          )
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      } else {
        Supplies.findAll().then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      }
    });
  },
  add: async (data, products) => {
    return new Promise((resolve, reject) => {
      return sequelize.transaction().then(t => {
        return Supplies.update(
          _.pick(data, ["value", "items", "ref_provider"]),
          { transaction: t, where: { id: data.supplyId } }
        )
          .then(supply => {
            products.map((product, index) => {
              return Products.findOne({ where: { id: product.id } }).then(
                pro => {
                  return Products.update(
                    {
                      purchase_cost: product.price,
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
                        unit_price: product.price,
                        total_price: product.price * product.quantity,
                        ref_supplier: data.ref_provider,
                        ref_supply: data.supplyId
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
  addNew: (data) => {
    return new Promise((resolve, reject) => {
      Supplies.create(_.pick(data, ['name'])).then(result => {

        resolve(result);
      })
        .catch(e => {
          reject(e);
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
    return new Promise((resolve, rejcet) => {
      sequelize
        .query(
          `SELECT psf.*,p.name,p.barcode,sup.name as supplier_name from product_stock_flow psf INNER JOIN products p ON p.id=psf.ref_product_id INNER JOIN suppliers sup ON sup.id=psf.ref_supplier AND p.status = '1' WHERE ref_supply = '${id}' AND type = 'supply'  `,
          {
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            plain: false
          }
        )
        .then(res => {
          resolve(res);
        })
        .catch(error => {
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
    return new Promise((resolve, reject) => {
      Supplies.findAll({
        attributes: ['id', 'ref_provider', 'name', 'description'],
        where: {
          id
        }
      }).then(res => {
        resolve(res[0])
      }).catch(err => {
        reject(err)
      })
    });
  },
  updateSignle: data => {
    return new Promise((resolve, reject) => {
      Supplies.update(_.pick(data, ['name', 'description', 'ref_provider']), {
        where: {
          id: data.id
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    });
  },
  getProduct: id => {
    return new Promise((resolve, reject) => {
      ProductStockFlow.findAll({
        attributes: ['id', 'ref_product_code', 'ref_product_id', 'quantity_before', 'quantity', 'quantity_after', 'unit_price'],
        where: {
          id
        }
      }).then(res => {
        resolve(res[0])
      }).catch(err => {
        reject(err)
      })
    });
  },
  updateProductStock: data => {
    return new Promise((resolve, reject) => {
      ProductStockFlow.update(_.pick(data, ["unit_price", "quantity_after", "quantity"]), {
        where: {
          id: data.id
        }
      }).then(res => {
        resolve(res);

      }).catch(err => {
        reject(err)
      })
    })
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
