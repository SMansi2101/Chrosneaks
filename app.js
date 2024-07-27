const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const path  = require('path');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const expressSession = require('express-session');
const flash = require('connect-flash');

require("dotenv").config();

const db = require('./config/mongoose-connection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,  
    })
);
app.use(flash());

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/register", registerRouter); 
app.use("/login", loginRouter);   

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});