// const express = require("express");
const categories = require("../routes/inventory/categories");
const suppliers = require("../routes/suppliers");
const supplies = require("../routes/inventory/supplies");
const products = require("../routes/inventory/products");
const customers = require("../routes/customers");
const orders = require("../routes/orders");
const reports = require("../routes/reports");
const users = require("../routes/users");
const taxes = require("../routes/taxes");
const auth = require("../middleware/auth");
// const cors = require("cors");
// const helmet = require("helmet");
// const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use("/api/products", products);
  app.use("/api/categories", categories);
  app.use("/api/supplies", supplies);
  app.use("/api/suppliers", suppliers);
  app.use("/api/customers", customers);
  app.use("/api/orders", orders);
  app.use("/api/reports", reports);
  app.use("/api/users", users);
  app.use("/api/taxes", taxes);
};
