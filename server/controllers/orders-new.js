const db = require("../db/connection");
const PointOfSale = require("../models").point_of_sale;
const OrderedItems = require("../models").order_items;
const ProductStockFlow = require("../models/").product_stock_flow;
const Products = require("../models/").products;

module.exports = {
  getAll: () => {
    // let query = "Select * from `category` ";
    console.log("products here");
    return new Promise((resolve, reject) => {
      db.query("Select * from point_of_sale", (err, result) => {
        if (err) {
          reject("error", err);
          console.log(err);
        }
        resolve(result);
      });
    });
  },
  add: (data, products) => {
    // let query = `INSERT INTO point_of_sale (title, code, ref_client, payment_type, total_received, discount_in_cash,discount_type,discount_percent,total_payable, total_items, description) VALUES ('${
    //   data.orderName
    // }', '${data.orderCode}', '${data.selectedCustomer.value}', '${
    //   data.paymentType
    // }', '${data.netPayable}', '${data.discount}', '${data.discountType}','${
    //   data.discountPercentage
    // }','${data.subTotal}','${data.totalItems}','${data.orderNote}')`;

    let posData = {
      title: data.orderName,
      code: data.orderCode,
      ref_client: data.selectedCustomer.value,
      payment_type: data.paymentType,
      total_received: data.netPayable,
      discount_in_cash: data.discount,
      discount_type: data.discountType,
      discount_percent: data.discountPercentage,
      total_payable: data.subTotal,
      total_items: data.totalItems,
      description: data.orderNote,
      customer_pay: data.customer_pay,
      customer_return: data.customer_return
    };
    let orderItems = [];

    // return new Promise((resolve, reject) => {
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
          "customer_return"
        ]),
        { transaction: t }
      )
        .then(async pos => {
          console.log("POS created");
          return Sequelize.Promise.map(products, product => {
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
            ).then(async orderItems => {
              console.log("Oi created");

              return Products.findOne({ where: { id: product.id } }).then(
                async foundProduct => {
                  return ProductStockFlow.create(
                    {
                      ref_product_id: foundProduct.id,
                      ref_product_code: foundProduct.barcode,
                      quantity_before: foundProduct.quantity,
                      quantity: product.quantity,
                      quantity_after: foundProduct.quantity - product.quantity,
                      type: "sale",
                      unit_price: foundProduct.selling_price,
                      total_price:
                        foundProduct.selling_price * product.quantity,
                      ref_supplier: null,
                      ref_supply: null
                    },
                    { transaction: t }
                  ).then(stockFlow => {
                    console.log("SF created");

                    return Products.update(
                      {
                        quantity: foundProduct.quantity - product.quantity,
                        quantity_sold:
                          foundProduct.quantity_sold + product.quantity
                      },
                      { where: { id: foundProduct.id }, transaction: t }
                    ).then(updatePro => {
                      console.log("UP created");

                      console.group({
                        updatePro,
                        orderItems,
                        pos,
                        stockFlow
                      });
                      return {
                        updatePro,
                        orderItems,
                        pos,
                        stockFlow
                      };
                    });
                  });
                }
              );
            });
          });
        })
        .then(products => {
          console.log({ products });
          t.commit();
        })
        .catch(posErro => {
          console.log({ posErro });
          t.rollback();
          return reject(posErro);
        });
    });
    // });
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
  edit: (data, param) => {
    let query = `UPDATE products SET name='${data.name}', ref_category='${data.ref_category}', selling_price='${data.selling_price}', description='${data.description}', sku='${data.sku}', product_status='${data.status}', selling_price_TTC_all_taxes_included='${data.selling_price_TTC_all_taxes_included}',weight='${data.weight}',height='${data.height}',width='${data.width}',colour='${data.colour}',codebar='${data.codebar}' WHERE id=${param}`;
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
