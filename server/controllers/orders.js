"use strict";
const db = require("../db/connection");
const PointOfSale = require("../models").PointOfSale;
const OrderedItems = require("../models").OrderedItems;
const ProductStockFlow = require("../models/").ProductStockFlow;
const Products = require("../models/").Products;

module.exports = {
  getAll: () => {
    // let query = "Select * from `category` ";
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `Select pos.*, c.name as cname from point_of_sale pos INNER JOIN customers c ON c.id=pos.ref_client `,
          {
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            plain: false
          }
        ).then(res => {
          console.log({ res });
          resolve(res);
        }).catch(e => {
          reject(e);
        })

    });
  },
  add: (data, products) => {
    let posData = {
      title: data.orderName,
      code: data.orderCode,
      ref_client: data.selectedCustomer.value,
      payment_type: data.paymentType,
      total_received: data.totalPaid,
      discount_in_cash: data.discount,
      discount_type: data.discountType,
      discount_percent: data.discountPercentage,
      total_payable: data.subTotal,
      total_items: data.totalItems,
      description: data.orderNote,
      customer_pay: data.customer_pay,
      order_status: data.order_status,
      customer_return: data.customer_return
    };
    return new Promise((resolve, reject) => {
      return sequelize.transaction({ autocommit: false }).then(t => {
        return PointOfSale.create(
          _.pick(posData, [
            "title",
            "code",
            "ref_client",
            "payment_type",
            "total_received",
            "discount_in_cash",
            "discount_type",
            "discount_percent",
            "total_payable",
            "total_items",
            "description",
            "customer_pay",
            "customer_return",
            "order_status"
          ]),
          { transaction: t }
        )
          .then(pos => {
            return products.map((product, index) => {
              OrderedItems.create(
                {
                  item_price: product.price,
                  item_code: product.code,
                  item_id: product.id,
                  item_quantity: product.quantity,
                  order_code: data.orderCode,
                  total_price: product.total
                },
                { transaction: t }
              ).then(orderItem => {
                return Products.findOne({ where: { id: product.id } }).then(
                  foundProduct => {
                    return ProductStockFlow.create(
                      {
                        ref_product_id: foundProduct.id,
                        ref_product_code: foundProduct.barcode,
                        quantity_before: foundProduct.quantity,
                        quantity: product.quantity,
                        quantity_after:
                          foundProduct.quantity - product.quantity,
                        type: "sale",
                        unit_price: foundProduct.selling_price,
                        total_price:
                          foundProduct.selling_price * product.quantity,
                        ref_supplier: null,
                        ref_supply: null
                      },
                      { transaction: t }
                    ).then(stockFlow => {
                      return Products.update(
                        {
                          quantity: foundProduct.quantity - product.quantity,
                          quantity_sold:
                            foundProduct.quantity_sold + product.quantity
                        },
                        { where: { id: foundProduct.id }, transaction: t }
                      ).then(updatedPro => {
                        if (index === products.length - 1) {
                          t.commit();
                          resolve(data.orderCode);
                        }
                      });
                    });
                  }
                );
              });
            });
          })
          .then(data => {
            console.log({ data });
          })
          .catch(posErro => {
            console.log({ posErro });
            t.rollback();
            return reject(posErro);
          });
      });
    });
  },
  updateOrder: (data, products, id) => {
    let posData = {
      title: data.orderName,
      code: data.code,
      ref_client: data.selectedCustomer.value,
      payment_type: data.paymentType,
      total_received: data.totalPaid,
      discount_in_cash: data.discount,
      discount_type: data.discountType,
      discount_percent: data.discountPercentage,
      total_payable: data.subTotal,
      total_items: data.totalItems,
      description: data.orderNote,
      customer_pay: data.customer_pay,
      order_status: data.order_status,
      customer_return: data.customer_return
    };

    let delIndex = 0;

    return new Promise((resolve, reject) => {
      return sequelize.transaction({ autocommit: false }).then(t => {
        return PointOfSale.update(
          _.pick(posData, [
            "title",
            "code",
            "ref_client",
            "payment_type",
            "total_received",
            "discount_in_cash",
            "discount_type",
            "discount_percent",
            "total_payable",
            "total_items",
            "description",
            "customer_pay",
            "customer_return",
            "order_status"
          ]),
          {
            where: {
              id: id,
              code: data.code
            },
            transaction: t
          }
        )
          .then(pos => {
            return products.map((product, index) => {
              OrderedItems.update(
                {
                  item_price: product.price,
                  item_quantity: product.quantity,
                  total_price: product.total
                },
                {
                  where: {
                    item_id: product.id,
                    order_code: data.code
                  },
                  transaction: t
                }
              ).then(orderItem => {
                return Products.findOne({ where: { id: product.id } }).then(
                  foundProduct => {
                    return ProductStockFlow.create(
                      {
                        ref_product_id: foundProduct.id,
                        ref_product_code: foundProduct.barcode,
                        quantity_before: foundProduct.quantity,
                        quantity: product.quantity,
                        quantity_after:
                          foundProduct.quantity - product.quantity,
                        type: "sale",
                        unit_price: foundProduct.selling_price,
                        total_price:
                          foundProduct.selling_price * product.quantity,
                        ref_supplier: null,
                        ref_supply: null
                      },
                      { transaction: t }
                    ).then(stockFlow => {
                      return Products.update(
                        {
                          quantity: foundProduct.quantity - product.quantity,
                          quantity_sold:
                            foundProduct.quantity_sold + product.quantity
                        },
                        { where: { id: foundProduct.id }, transaction: t }
                      ).then(updatedPro => {
                        if (data.deletedItem.length !== 0) {
                          if (delIndex < data.deletedItem.length) {
                            data.deletedItem.map((id, index2) => {
                              OrderedItems.destroy(
                                {
                                  where: {
                                    item_id: id,
                                    order_code: data.code
                                  }
                                },
                                { transaction: t }
                              ).then(destroyed => {
                                delIndex += 1;
                                if (index2 === data.deletedItem.length - 1) {
                                  resolve(pos.code);
                                }
                              });
                            });
                          }
                        }
                        if (index === products.length - 1) {
                          t.commit();
                          resolve(pos.code);
                        }
                      });
                    });
                  }
                );
              });
            });
          })
          .then(data => {
            console.log({ data });
          })
          .catch(posErro => {
            console.log({ posErro });
            t.rollback();
            return reject(posErro);
          });
      });
    });
  },
  get: data => {
    let query = `Select * From category WHERE id = ${data}`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject("error", err);
        resolve(result);
      });
    });
  },
  getPendingOrder: orderCode => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT pos.id, pos.title, pos.description, pos.code, pos.total_items, pos.ref_client, pos.payment_type, pos.total_received, pos.discount_in_cash, pos.discount_type, pos.discount_percent, pos.total_payable, pos.customer_pay, pos.customer_return, pos.status, pos.order_status, pos.createdAt, pos.updatedAt, oi.id AS 'oi.oiId', oi.item_price AS 'oi.item_price', oi.item_code AS 'oi.item_code', oi.item_id AS 'oi.id', oi.item_quantity AS 'oi.quantity', oi.order_code AS 'oi.order_code', oi.total_price AS 'oi.totalPrice', oi.status AS 'oi.status', oi.createdAt AS 'oi.createdAt', oi.updatedAt AS 'oi.updatedAt', p.id AS 'oi.pId',p.name AS 'oi.name',p.quantity AS 'oi.pQuantity',p.quantity_remaining As 'oi.quantity_remaining', p.selling_price	as 'oi.selling_price' FROM point_of_sale pos INNER JOIN ordered_items oi INNER JOIN products p ON oi.order_code = '${orderCode}' AND p.id=oi.item_id  WHERE pos.code = '${orderCode}' AND pos.status = 1 AND pos.order_status = 'pending' `,
          {
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            plain: false
          }
        )
        .then(res => {
          let data = res;
          let orderDetail = {};
          orderDetail.oi = [];
          data.forEach(val => {
            let length = 0;
            let order = {};
            for (let i in val) {
              if (i.includes(".")) {
                order[i.split(".")[1]] = val[i];
                length++;
                if (length == 14) {
                  orderDetail.oi.push(order);
                }
              } else {
                orderDetail[i] = val[i];
              }
            }
          });
          resolve(orderDetail);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  },
  edit: (data, param) => {
    let query = `UPDATE products SET name='${data.name}', ref_category='${
      data.ref_category
      }', selling_price='${data.selling_price}', description='${
      data.description
      }', sku='${data.sku}', product_status='${
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

// PointOfSale.hasMany(OrderedItems, {
//   foreignKey: "order_code",
//   targetKey: "order_code"
// });
// // OrderedItems.hasMany(PointOfSale, {
// //   foreignKey: "code",
// //   targetKey: "code"
// // });
// // OrderedItems.belongsTo(Products, {
// //   foreignKey: "item_id"
// // });
// PointOfSale.findAll({
//   // as: "PointOfSale",
//   include: [
//     {
//       model: OrderedItems,
//       all: true,
//       nested: true,
//       as: "OrderedItems",
//       on: {
//         order_code: orderCode
//       },
//       include: [
//         {
//           model: Products,
//           as: "Products",
//           all: true,
//           attributes: ["name", "id", "quantity_remaining", "quantity"],
//           on: {
//             id: Sequelize.col("OrderedItems.item_id")
//           }
//         }
//       ]
//     }
//   ],
//   where: {
//     code: orderCode,
//     status: 1,
//     order_status: "pending"
//   }
// })
//   .then(res => {
//     resolve(res);
//   })
//   .catch(e => {
//     console.log(e);
//     reject(e);
//   });