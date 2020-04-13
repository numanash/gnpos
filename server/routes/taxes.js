const express = require("express");
const router = express.Router();
const taxes = require("../controllers/taxes");

router.get("/", async (req, res, next) => {

  await taxes.getAll(req.query).then(result =>
    res.status(200).send(
      result
    )).catch(err => {
      res.status(500).send(
        err
      )
    })

});


router.get("/sub-taxes/:id", async (req, res, next) => {
  await taxes.getSubtaxes(req.params.id).then(result =>{
  if(result.length){
    res.status(200).send(
      result
    )}else{
      res.status(404).send("Not SubCategory Found")
    }
  }).catch(err => {
      res.status(500).send(
        err
      )
    })

});

router.post("/", async (req, res) => {
  let data = req.body;

  await taxes
    .add(data)
    .then(result => {
      res.status(201).send({
        message: data.name + " tax created",
        taxes: result
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });

  // })
});

router.get("/:id", async (req, res) => {
  await taxes
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
  let data = req.body;

  if (typeof data.parentCategory === "string") {
    data = { ...data, parentCategory: 0 };
  }
  await taxes
    .edit(data, req.params.id)
    .then(result => {
      res.status(200).send({
        message: "Category Updated SuccessFully"
      });
    })
    .catch(e => {
      res.status(400).send({
        error: e
      });
    });
});

router.delete("/:id", async (req, res) => {
  await taxes
    .delete(req.params.id)
    .then(result => {
      res.status(200).send({
        message: "Successfully deleted!"
      });
    })
    .catch(e => {
      res.status(404).send({
        error: e.errno === 1451 ? "Tax in use" : e.sqlMessage
      });
    });
});

router.get("/find", async (req, res) => {
  await taxes
    .find(req.query.search)
    .then(result => {
      res.status(200).send({
        category: result
      });
    })
    .catch(e => {
      res.status(404).send({
        error: "Error : " + e
      });
    });
});

module.exports = router;
