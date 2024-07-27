const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const expressSession = require('express-session');

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "You need to be logged in to access this page");
        return res.redirect("/login");
    }

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (err) {
            req.flash("error", "Invalid token");
            return res.redirect("/login");
        }
        req.user = decoded;
        next();
    });
}

module.exports = isLoggedIn;
