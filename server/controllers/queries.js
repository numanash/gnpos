// Supplies Queries
// Supply add transaction
// db.getConnection(function(err, connection) {
//   connection.beginTransaction(function(err) {
//     if (err) {
//       console.log({ error01: err });
//       connection.release();
//       // break;
//       throw err;
//     }

//     connection.query(query, function(err, result) {
//       if (err) {
//         connection.rollback(function() {
//           console.log({ error0: err });
//           connection.release();
//           throw err;
//         });
//       }
//       products.forEach(product => {
//         connection.query(
//           `UPDATE products as t, ( SELECT * FROM products WHERE barcode = '${
//             product.code
//           }') as temp
//     SET t.quantity= temp.quantity + ${
//       product.quantity
//     }, t.purchase_cost = ${product.purchasePrice}  WHERE t.id = temp.id`,
//           function(err, result) {
//             if (err) {
//               connection.rollback(function() {
//                 console.log({ error1: err });

//                 connection.release();
//                 // break;
//                 throw err;
//               });
//             }
//           }
//         );
//         console.log({ product });
//         connection.query(
//           `INSERT INTO product_stock_flow (ref_product_code,quantity_before,quantity,quantity_after,type,unit_price,total_price,ref_provider) SELECT barcode,quantity,'${
//             product.quantity
//           }',quantity + ${
//             product.quantity
//           },'supply',selling_price,'selling_price * ${product.quantity}','${
//             data.ref_provider
//           }'  from products Where barcode = ${product.code}`,
//           function(err, result) {
//             if (err) {
//               connection.rollback(function() {
//                 console.log({ error2: err });
//                 connection.release();
//                 // break;
//                 throw err;
//               });
//             } else {
//               connection.commit(function(err) {
//                 if (err) {
//                   connection.rollback(function() {
//                     console.log(err);
//                     console.log({ error3: err });

//                     connection.release();
//                     // break;
//                     throw err;
//                   });
//                 }
//                 console.log("Transaction Completed Successfully.");
//               });
//             }
//           }
//         );
//       });
//     });
//   });
// });

// let query = `Insert INTO supplies ( description, value, items, ref_provider) Values (\'${
//   data.description
// }\', \'${data.value}\', \'${data.items}\', \'${data.ref_provider}\')`;
