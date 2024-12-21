//imports
const jwt = require("jsonwebtoken")         //JSON web token
const db = require("../routes/db-config");  //database configuration
const { promisify } = require("util");      //util module

const uLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            //verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, process.env.JWT_SECRET);
            console.log("LOGGED IN");

            //check if the user still exist
            db.query("SELECT * FROM user_login WHERE id = ?", [decoded.id], (err, result) => {
                if(err) console.log(err);
                if(result == null) {
                    return next();
                }
                req.user = result[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }
}

module.exports = uLoggedIn;