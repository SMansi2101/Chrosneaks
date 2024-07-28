const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const { registerUser, loginUser } = require("../controller/authController");
const isLoggedIn = require('../middlewares/isLoggedIn');
const logoutRouter = require('../routes/logout');
const cartRouter = require('../routes/addtocart');
const cRouter = require('../routes/cart');

router.get("/", function(req, res) {
    res.send("hey it's working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/shop");

// Ensure this uses `router.use`
router.use('/logout', logoutRouter);
router.use('/addtocart', cartRouter);
router.use("/cart",cRouter);
// Login route
router.get('/login', (req, res) => {
    res.render('login');  // Ensure you have a login.ejs file in your views folder
});

module.exports = router;
