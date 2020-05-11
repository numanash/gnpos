const express = require("express");
const router = express.Router();
const products = require("../../controllers/inventory/products");
const genCode = require("../../constant/generateCode");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "../public/images/products");
  },

  filename: function(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|png|JPEG)$/)) {
      var err = new Error();

      err.code = "filetype";

      return callback(err);
    } else {
      callback(null, Date.now() + file.originalname);
    }
  }
});

var upload = multer({ storage: storage, limits: { fileSize: 1000000 } }).single(
  "imageUrl"
);

router.get("/", async (req, res, next) => {
  res.status(200).send(await products.getAll(req.query));
});
router.get("/find", async (req, res, next) => {
  await products
    .search(req.query)
    .then(result => {
      return result.length
        ? res.status(200).send(result)
        : res.status(404).send("Nothing Found");
    })
    .catch(err => {
      return res.status(404).send(err);
    });
});

router.get("/category/:categoryId", async (req, res, next) => {
  await products
    .getByCategory(req.params.categoryId)
    .then(result => {
      return result.length
        ? res.status(200).send(result)
        : res.status(404).send("Nothing Found");
    })
    .catch(err => {
      return res.status(404).send(err);
    });
});

router.post("/", (req, res) => {
  upload(req, res, async function(err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.send({ success: false, msg: "limit file size 1MB " });
      } else if (err.code === "filetype") {
        return res.send({
          success: false,
          msg: "Must be valid file extension only jpg or png"
        });
      } else {
        return res.send({ success: false, msg: "something went wrong" });
      }
    } else {
      if (!req.file) {
        // return res.send({ success: false, msg: "No file selected" });
      }
      var productCode = await genCode(5);
      let data = {
        ...req.body,
        barcode: productCode,
        image: req.file.filename
      };
      await products
        .add(data)
        .then(result => {
          res.status(201).send({
            message: req.body.name + " Product Added"
          });
        })
        .catch(e => {
          if (e.original.code === "ER_DUP_ENTRY") {
            res.status(500).send({
              message: "Product Already Exists"
            });
          } else if (e.name === "SequelizeDatabaseError") {
            res.status(500).send({
              message: e.parent.sqlMessage
            });
          } else {
            res.status(500).send({
              message: "Server Error Review in request",
              error: e
            });
          }
        });
    }
  });
});

router.get("/:id", async (req, res) => {
  await products
    .get(parseInt(req.params.id))
    .then(result => {
      res.status(200).send(result);
    })
    .catch(e => {
      res.status(400).send({
        message: e
      });
    });
});

router.get("/stock/:id", async (req, res) => {
  await products
    .productStockFlow(req.query, parseInt(req.params.id))
    .then(result => {
      res.status(200).send(result);
    })
    .catch(e => {
      res.status(400).send({
        message: e
      });
    });
});

router.put("/:id", async (req, res) => {
  await products
    .edit(req.body, req.params.id)
    .then(result => {
      res.status(202).send({
        message: "Product Updated SuccessFully"
      });
    })
    .catch(e => {
      res.status(204).send({
        message: new Error(e)
      });
    });
});

router.delete("/:id", async (req, res) => {
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

module.exports = router;
