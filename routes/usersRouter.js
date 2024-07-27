const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout} = require("../controller/authController");
const isLoggedIn = require('../middlewares/isLoggedIn')


router.get("/", function(req,res){
    res.send("hey it's working");
})

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",logout);
module.exports = router;