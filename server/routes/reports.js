const express = require("express");
const router = express.Router();
const reports = require("../controllers/reports");
const auth = require("../middleware/auth");
const inRoles = require("../middleware/inRoles");

let dashboard = {};

const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
  signed: true // if you use the secret with cookieParser
};

router.get("/sales", async (req, res, next) => {
  const { from, to } = req.query;
  var result = await reports.getSales(from, to);

  res.status(200).send({
    data: { sales: result }
  });
});

router.get("/best-sales", async (req, res) => {
  const { from, to } = req.query;
  if ((from && to) !== (null || undefined)) {
    res.status(200).send({
      data: await reports.getBestSales(from, to)
    });
  } else {
    res.status(200).send({
      data: await reports.getBestSales()
    });
  }
});
router.get("/order-details", async (req, res) => {
  const limit = req.query.to;
  if (dashboard.result) {
    let dashboardData = dashboard;
    dashboard = {};
    console.log(dashboardData);
    const orders = await reports.getShortOrderDetails(limit);
    const data = {
      orders,
      result: dashboardData
    };
    res.status(200).send({
      data
    });
  } else {
    res.status(200).send({
      data: await reports.getShortOrderDetails(limit)
    });
  }
});

router.get("/yearly-report", async (req, res) => {
  const { to } = req.query;
  var result = await reports.getYearlyReport(to);

  res.status(200).send({
    data: { sales: result }
  });
});

router.get(
  "/dashboard",
  [auth, inRoles(["admin", "cashier"])],
  async (req, res, next) => {
    let result = await reports.getReportsForDashboard();
    let inventory = await reports.getInventory();
    let orders = await reports.getShortOrderDetails(7);
    if (result) {
      dashboard.result = result;
      dashboard.inventory = inventory;
      dashboard.orders = orders;

      res.status(200).send({
        data: dashboard
      });
      // res.redirect("/api/reports/order-details?to=7");
    }
    next();
    // res.status(200).send({
    //   data: result
    // });
  }
);

router.put("/edit/:id", [auth, inRoles(["admin"])], async (req, res) => {
  await products
    .edit(req.body, req.params.id)
    .then(result => {
      res.status(202).send({
        data: "Product Updated SuccessFully"
      });
    })
    .catch(e => {
      res.status(204).send({
        error: new Error(e)
      });
    });
});

router.delete("/del/:id", async (req, res) => {
  await products
    .delete(req.params.id)
    .then(result => {
      res.status(202).send({
        message: "Successfully deleted!"
      });
    })
    .catch(e => {
      res.status(404).send({
        error: new Error(e)
      });
    });
});

router.get("/receipt/:id", async (req, res) => {
  await reports
    .getSaleReceipt(req.params.id)
    .then(result => {
      res.status(200).send({
        data: result
      });
    })
    .catch(e => {
      res.status(500).send({
        error: "Internal Server Error"
      });
    });
});

module.exports = router;
