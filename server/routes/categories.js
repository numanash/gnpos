const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories");

router.get("/", async (req, res, next) => {
  res.status(200).send({
    data: await categories.getAll()
  });
});

router.post("/add", async (req, res) => {
  let data = req.body;

  if (typeof data.parentCategory === "string") {
    data = { ...data, parentCategory: 0 };
  }

  await categories
    .add(data)
    .then(result => {
      res.status(201).send({
        message: "Category Inserted",
        data: result
      });
    })
    .catch(e => {
      res.status(500).send({
        error: "Failed !" + e
      });
    });

  // })
});

router.get("/edit/:id", async (req, res) => {
  await categories
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
  let data = req.body;

  if (typeof data.parentCategory === "string") {
    data = { ...data, parentCategory: 0 };
  }
  await categories
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

router.delete("/del/:id", async (req, res) => {
  await categories
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
  await categories
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
