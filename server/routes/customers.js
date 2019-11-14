const express = require("express");
const router = express.Router();
const customers = require("../controllers/customers");

router.get("/", async (req, res, next) => {
  res.status(200).send({
    data: await customers.getAll()
  });
});

router.post("/add", async (req, res) => {
  await customers
    .add(req.body)
    .then(result => {
      res.status(201).send({
        message: "Customer Added "
      });
    })
    .catch(e => {
      res.status(500).send({
        error: e
      });
    });

  // })
});

router.get("/edit/:id", async (req, res) => {
  await customers
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
  await customers
    .edit(req.body, req.params.id)
    .then(result => {
      res.status(202).send({
        data: "Category Updated SuccessFully"
      });
    })
    .catch(e => {
      res.status(204).send({
        error: e
      });
    });
});

router.delete("/del/:id", async (req, res) => {
  await customers
    .delete(req.params.id)
    .then(result => {
      res.status(200).send({
        message: "Successfully deleted!"
      });
    })
    .catch(e => {
      res.status(404).send({
        error: e.errno === 1451 ? "Category in use" : e.sqlMessage
      });
    });
});

router.get("/find", async (req, res) => {
  await customers
    .find(req.query.search)
    .then(result => {
      res.status(200).send({
        customer: result
      });
    })
    .catch(e => {
      res.status(404).send({
        error: "Error : " + e
      });
    });
});

module.exports = router;
