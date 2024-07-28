const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

router.get("/", isLoggedIn, async function(req, res) {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    // Calculate the bill for each item in the cart
    const cartitems = user.cart.map(item => {
        const bill = item.price + 20 + item.shippingfee - item.discount;
        return {
            id: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            discount: item.discount,
            shippingfee: item.shippingfee,
            bgcolor: item.bgcolor,
            textcolor: item.textcolor,
            bill: bill
        };
    });

    res.render("cart", { cartitems });
});

router.delete('/remove/:id', isLoggedIn, async function(req, res) {
    const itemId = req.params.id;
    const userId = req.user.id; // User ID from token


    try {
        // Find user and remove item from cart
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Pull the item from user's cart
        await userModel.findByIdAndUpdate(
            userId,
            { $pull: { cart: itemId } }
        );
        
        res.redirect('/cart');
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.sendStatus(500);
    }
});

module.exports = router;
