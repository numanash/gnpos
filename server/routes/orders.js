const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders");
const genCode = require("../constant/generateCode");

router.get("/", async (req, res, next) => {
  console.log("here");
  res.status(200).send({
    data: await orders.getAll()
  });
});

router.post("/add", async (req, res) => {
  var orderCode = await genCode();
  const body = { ...req.body, orderCode };
  const products = body.products;
  await orders
    .add(body, products)
    .then(result => {
      if (result) {
        res.status(201).send({
          message: "Order Created",
          orders: result
        });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).send({
        error: new Error(e)
      });
    });
});

router.get("/pending/:id", async (req, res) => {
  await orders
    .getPendingOrder(req.params.id)
    .then(result => {
      res.status(200).send({
        data: result
      });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send({
        error: e
      });
    });
});

router.get("/edit/:id", async (req, res) => {
  await orders
    .get(parseInt(req.params.id))
    .then(result => {
      res.status(200).send({
        data: result
      });
    })
    .catch(e => {
      res.status(500).send({
        error: e
      });
    });
});

router.put("/edit/:id", async (req, res) => {
  console.log(req.body);
  await orders
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
router.put("/update/:id", async (req, res) => {
  const body = req.body;
  const products = body.products;
  await orders
    .updateOrder(body, products, req.params.id)
    .then(result => {
      console.log({
        result
      });
      res.status(202).send({
        message: "Order updated successfully ",
        orders: result
      });
    })
    .catch(e => {
      console.log({ e });
      res.status(204).send({
        error: new Error(e)
      });
    });
});

router.delete("/del/:id", async (req, res) => {
  await orders
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

module.exports = router;
