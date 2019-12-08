const express = require("express");
const router = express.Router();
const supplies = require("../../controllers/inventory/supplies");

router.get("/", async (req, res, next) => {
  res.status(200).send(
    await supplies.getAll(req.query)
  );
});

router.get("/:id", async (req, res, next) => {

  await supplies
    .get(req.params.id)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(404).send(err);;
    })
});
router.get("/:id", async (req, res, next) => {

  await supplies
    .get(req.params.id)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(404).send(err);;
    })
});


router.get("/single/:id", async (req, res, next) => {

  await supplies
    .getSignle(req.params.id)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(404).send(err);;
    })
});
router.put("/single/:id", async (req, res, next) => {

  await supplies
    .updateSignle(req.body)
    .then(result => {
      return res.status(200).send({ message: "Supply update" });
    })
    .catch(err => {
      return res.status(400).send({ err, message: "Something went wrong. review in network request" });
    })
});

router.get("/product/:id", async (req, res, next) => {
  await supplies
    .getProduct(req.params.id)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(404).send(err);
    })
})

router.post("/add", async (req, res) => {
  await supplies.addNew(req.body).then(result => {
    console.log(result)
    res.status(201).send({
      message: "Supply Inserted"
    });
  })
    .catch(e => {
      if (e.parent && e.parent.code === "ER_DUP_ENTRY") {
        return res.status(403).send({
          error: req.body.name + " name already exist"
        })
      } else if (e.name === "SequelizeDatabaseError") {
        return res.status(403).send({
          error: e.parent.sqlMessage
        })
      }
      res.status(500).send({
        error: "Supply not added error on server"
      });
    });
})

router.post("/", async (req, res) => {


  let products = req.body.products;

  await supplies
    .add(req.body, products)
    .then(result => {
      res.status(201).send({
        message: "Items Inserted into Supply",
        isAdd: true
      });
    })
    .catch(e => {
      console.log(e);
      res.status(500).send({
        message: "Supply not added error on server",
        isAdd: false
      });
    });
});


router.put("/product/:id", async (req, res, next) => {
  await supplies
    .updateProductStock(req.body)
    .then(result => {
      return res.status(200).send({ message: 'Stock update successfully' });
    })
    .catch(err => {
      return res.status(400).send(err);
    })
})

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
