const express = require("express");
const router = express.Router();
const products = require("../../controllers/products");
const genCode = require("../../constant/generateCode");

router.get("/", async (req, res, next) => {
    res.status(200).send({
        data: await products.getAll()
    });
});

router.post("/", async (req, res) => {
    var productCode = await genCode(5);
    let data = {
        ...req.body,
        barcode: productCode
    };
    await products
        .add(data)
        .then(result => {
            res.status(201).send({
                message: "Product Added",
                isAdd: true
            });
        })
        .catch(e => {
            if (e.original.code === "ER_DUP_ENTRY") {
                res.status(500).send({
                    message: "Product Already Exists",
                    isAdd: false
                });
            } else {
                res.status(500).send({
                    message: "Server Error",
                    isAdd: false
                });
            }
        });
});

router.get("/:id", async (req, res) => {
    await products
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
