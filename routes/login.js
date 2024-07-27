const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get("/", function(req, res) {
   let error = req.flash("error");
   res.render("login" , {error , loggedin:false});
});


module.exports = router;