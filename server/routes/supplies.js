const express = require("express");
const router = express.Router();
const supplies = require("../controllers/supplies");

router.get("/", async (req, res, next) => {
  res.status(200).send({
    data: await supplies.getAll()
  });
});

router.get("/view/:id", async (req, res, next) => {
  res.status(200).send({
    data: await supplies
      .get(req.params.id)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
  });
});

router.post("/add", async (req, res) => {
  var products = [];
  const data = {
    title: req.body.supName,
    description: req.body.supDesc,
    value: req.body.subTotal,
    items: req.body.totalItems,
    ref_provider: req.body.suppName
  };

  products = req.body.supProducts;

  await supplies
    .add(data, products)
    .then(result => {
      res.status(201).send({
        message: "Supplies Inserted",
        isAdd: true
      });
    })
    .catch(e => {
      res.status(500).send({
        message: "Supply not added error on server",
        isAdd: false
      });
    });
});

router.get("/edit/:id", async (req, res) => {
  await supplies
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

router.get("/edit/:id", async (req, res) => { });

router.put("/edit/:id", async (req, res) => {
  console.log(req.body);
  await supplies
    .edit(req.body, req.params.id)
    .then(result => {
      res.status(202).send({
        data: "Product Updated SuccessFully"
      });
    })
    .catch(e => {
      res.status(204).send({
        error: e
      });
    });
});

router.delete("/del/:id", async (req, res) => {
  await supplies
    .delete(req.params.id)
    .then(result => {
      res.status(202).send({
        message: "Successfully deleted!"
      });
    })
    .catch(e => {
      res.status(404).send({
        error: "Error : " + e
      });
    });
});

module.exports = router;
