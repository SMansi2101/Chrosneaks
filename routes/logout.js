const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    res.cookie("token", "");
    res.redirect("/login");
});

module.exports = router;