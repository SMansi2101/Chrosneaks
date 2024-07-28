const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

router.get("/", isLoggedIn, async function(req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render('shop',{products , success});
});

module.exports = router;