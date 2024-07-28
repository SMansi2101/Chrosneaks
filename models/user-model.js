const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chrosneaks");

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        trim:true,
        minlegnth: 3,
    },
    email: String,
    password: String,
    cart: [ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : "product",
    },
],
    orders: {
        type: Array,
        default: []
    },
    picture: String,
    contact: Number,
});

module.exports = mongoose.model("user", userSchema);