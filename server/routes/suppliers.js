const express = require("express");
const router = express.Router();
const suppliers = require("../controllers/suppliers");

router.get("/", async (req, res, next) => {
  await suppliers
    .getAll(req.query)
    .then(result => {
      res.status(200).send(
        result
      );
    })
    .catch(e => {
      console.log(e);
      res.status(500).send({
        data: e
      });
    });
});

router.post("/", async (req, res) => {
  await suppliers
    .add(req.body)
    .then(result => {
      res.status(201).send({
        message: req.body.name + " Supplier Added"
      });
    })
    .catch(e => {
      res.status(500).send({
        error: e
      });
    });
});

router.get("/edit/:id", async (req, res) => {
  await suppliers
    .get(parseInt(req.params.id))
    .then(result => {
      console.log(result);
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
  await suppliers
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
  console.log(req.params);
  await suppliers
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
