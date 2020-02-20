const db = require("../db/connection");
const { getDates, color, yesterday } = require("../utils/getData");
const moment = require("moment");

module.exports = {
  getSales: (from, to) => {
    // let query = "Select * from `category` ";
    console.log("products here");
    return new Promise((resolve, reject) => {
      db.query(
        `Select total_received,code,GROUP_CONCAT(item_quantity) as quantity,GROUP_CONCAT(total_price) as price,total_received,total_payable,GROUP_CONCAT(name) as pName,GROUP_CONCAT(item_code) as iCode,pos.createdAt from point_of_sale pos JOIN ordered_items oi JOIN products p ON pos.code = oi.order_code AND p.barcode = oi.item_code AND pos.createdAt BETWEEN "${from}" AND "${to}" GROUP By pos.code ORDER BY createdAt DESC`,
        (err, result) => {
          if (err) {
            reject("error", err);
            console.log(err);
          }
          var date = getDates(new Date(from), new Date(to));
          console.log(result);
          // for (let i = 0; i < result.length; i++) {
          //   let res = result[i];
          //   if (res.pName.includes(",")) {
          //     var quantity = res.quantity.split(",");
          //     console.log(quantity);
          //   }
          // }
          resolve(result);
        }
      );
    });
  },
  getBestSales: (from, to) => {
    // let query = "Select * from `category` ";
    if ((from, to)) {
      return new Promise((resolve, reject) => {
        const query = `SELECT GROUP_CONCAT(item_quantity) as quantity,item_code, GROUP_CONCAT(DATE_FORMAT(oi.createdAt,"%Y-%m-%d")) as order_date, name FROM ordered_items oi JOIN products p INNER JOIN point_of_sale pos WHERE p.barcode = oi.item_code AND (pos.code = oi.order_code AND pos.order_status='completed') AND oi.createdAt BETWEEN '${from}' AND '${to}' GROUP BY oi.item_Code `;

        db.query(query, (err, result) => {
          if (err) {
            reject("error", err);
            console.log(err);
          }
          console.log(result);
          let label = [];
          let products = [];
          var dates = getDates(from, to);
          if (result) {
            if (result.length !== 0) {
              result.map(res => {
                if (res.quantity.includes(",")) {
                  const quantity = res.quantity.split(",");
                  const sold_date = res.order_date.split(",");
                  let quan = new Array();
                  let product = new Object();
                  product.label = res.name;
                  product.data = new Array();
                  quantity.map((q, index) => {
                    dates.map((d, i) => {
                      if (sold_date[index] === d) {
                        if (typeof product.data[i] == "undefined") {
                          product.data[i] = 0;
                        }
                        product.data[i] += parseInt(q);
                      } else {
                        if (typeof product.data[i] == "undefined") {
                          product.data[i] = 0;
                        }
                      }
                    });
                  });
                  product.borderColor = color();
                  product.fill = 1;
                  products.push(product);
                } else {
                  let product = new Object();
                  product.label = res.name;
                  product.data = new Array();
                  dates.map((d, i) => {
                    if (res.order_date === d) {
                      product.data[i] = res.quantity;
                    } else {
                      product.data[i] = 0;
                    }
                  });
                  product.borderColor = color();
                  product.fill = 1;
                  products.push(product);
                }
              });
            }
          }
          var chartLabels = dates.map((val, index) => {
            return moment(val).format("MMMM DD YYYY");
          });
          // if (result.length !== 0) {
          //   result.map(res => {});
          // }
          // if (result.length !== 0) {
          //   result.map(res => {
          //     label.push(res.order_date);
          //     if (res.quantity.includes(",")) {
          //       const order_date = res.order_date.split(",");
          //       // const pName = res.pName.split(",");
          //       const quantity = res.quantity.split(",");
          //       for (let i = 0; i < quantity.length; i++) {
          //         const product = {
          //           name: name,
          //           quantity: quantity[i],
          //           // code: code[i],
          //           order_date: order_date[i]
          //         };
          //         products.push(product);
          //       }
          //     }
          //   });
          // }
          resolve({ products, dates: chartLabels });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        db.query(
          `SELECT name , SUM(item_quantity) as quantities from products p JOIN ordered_items o 
          ON p.barcode = o.item_code GROUP BY item_code ORDER BY 'quantities' DESC`,
          (err, result) => {
            if (err) {
              reject("error", err);
              console.log(err);
            }
            resolve(result);
          }
        );
      });
    }
  },
  getYearlyReport: year => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
        p.name as name,  
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='January') THEN oi.total_price ELSE 0 END) AS January,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='Feburary') THEN oi.total_price ELSE 0 END) AS Feburary,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='March') THEN oi.total_price ELSE 0 END) AS March,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='April') THEN oi.total_price ELSE 0 END) AS April,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='May') THEN oi.total_price ELSE 0 END) AS May,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='June') THEN oi.total_price ELSE 0 END) AS June,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='July') THEN oi.total_price ELSE 0 END) AS July,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='August') THEN oi.total_price ELSE 0 END) AS August,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='September') THEN oi.total_price ELSE 0 END) AS September,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='October') THEN oi.total_price ELSE 0 END) AS October,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='November') THEN oi.total_price ELSE 0 END) AS November,
        SUM(CASE WHEN (DATE_FORMAT(oi.createdAt,"%M")='December') THEN oi.total_price ELSE 0 END) AS December,
        SUM(oi.total_price) AS Total
    FROM 
        ordered_items oi
        JOIN products p
        ON oi.item_id = p.id AND DATE_FORMAT(oi.createdAt,"%Y") = ${year}
     GROUP BY 
        oi.id `,
        (err, result) => {
          if (err) {
            reject("error", err);
            console.log(err);
          }
          // for (let i = 0; i < result.length; i++) {
          //   let res = result[i];
          //   if (res.pName.includes(",")) {
          //     var quantity = res.quantity.split(",");
          //     console.log(quantity);
          //   }
          // }
          // let products = [];
          // const months = moment.monthsShort();
          // result.map(res => {
          //   let product = new Object();
          //   product.name = res.pName;
          //   product.price = new Array();
          //   product.price.push(res.total);
          //   product.date = new Array();
          //   product.date.push(res.date);
          //   product.code = res.code;
          //   let index;
          //   let productObj = products.find((p, i) => {
          //     if (p.code === product.code && p.name === product.name) {
          //       index = i;
          //       return p;
          //     }
          //   });
          //   if (productObj) {
          //     if (productObj.date === product.date) {
          //       product.price += productObj.price;
          //       products[index] = product;
          //     } else {
          //       let productDate = product.date;
          //       products[index].date += `,${productObj.date}`;
          //       products[index].price += `,${productObj.price}`;
          //       // products[index].date = new Array();
          //       // product[index].date.push(productDate);
          //       // product[index].date.push(productObj.date);
          //     }
          //   } else {
          //     products.push(product);
          //   }
          // });

          resolve(result);
        }
      );
    });
  },
  getShortOrderDetails: limit => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id as orderId,code,createdAt,total_items,payment_type,total_received as total FROM point_of_sale ORDER BY createdAt DESC LIMIT ${limit}`,
        (err, result) => {
          if (err) {
            reject("error", err);
            console.log(err);
          }
          resolve(result);
        }
      );
    });
  },
  getReportsForDashboard: async () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT total_items as items, total_received as received, DATE_FORMAT(createdAt,"%Y-%m-%d") as order_date from point_of_sale WHERE status = 1`,
        (err, result) => {
          if (err) {
            reject("error", err);
            console.log(err);
          }
          let total_sold_items = 0;
          let yesterdayItems = 0;
          let todayItems = 0;

          let total_received_cash = 0;
          let yesterdayCash = 0;
          let todayCash = 0;
          if (result) {
            if (result.length !== 0) {
              result.reduce((prev, cur) => {
                total_sold_items += cur.items;
                total_received_cash += cur.received;
                if (
                  cur.order_date === moment(new Date()).format("YYYY-MM-DD")
                ) {
                  todayCash += cur.received;
                  todayItems += cur.items;
                }
                if (cur.order_date === moment(yesterday).format("YYYY-MM-DD")) {
                  yesterdayCash += cur.received;
                  yesterdayItems += cur.items;
                }
              }, 0);
            }
          }

          // result.map(res => {});

          resolve({
            total_received_cash,
            total_sold_items,
            todayCash,
            todayItems,
            yesterdayCash,
            yesterdayItems
          });
        }
      );
    });
  },
  getInventory: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT SUM(quantity_remaining) as remaining, SUM(quantity_sold) as sold from products WHERE status = 1`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject("error", err);
          }
          let invetory = {};
          if (result) {
            result.map(res => {
              if (res.remaining !== null && res.sold !== null) {
                invetory.remaining = res.remaining;
                invetory.sold = res.sold;
              } else {
                invetory.remaining = 0;
                invetory.sold = 0;
              }
            });
          }
          resolve(invetory);
        }
      );
    });
  },
  getSaleReceipt: orderCode => {
    return new Promise((resolve, reject) => {
      db.query(
        `Select code,order_status,GROUP_CONCAT(item_quantity) as quantity,GROUP_CONCAT(total_price) as price,GROUP_CONCAT(item_price) as iPrice,total_received,discount_in_cash as discount,customer_pay,customer_return, total_payable,GROUP_CONCAT(p.name) as pName,GROUP_CONCAT(item_code) as iCode,pos.createdAt,cs.name as cName, pos.total_items as items from point_of_sale pos JOIN ordered_items oi JOIN products p ON pos.code = oi.order_code AND p.id = oi.item_id JOIN customers cs WHERE pos.ref_client = cs.id AND pos.code = '${orderCode}' GROUP BY pos.code`,
        (err, result) => {
          if (err) {
            console.log({ err });
            reject("error", err);
          }

          resolve(result);
        }
      );
    });
  }
};
