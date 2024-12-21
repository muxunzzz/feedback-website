//imports
const jwt = require("jsonwebtoken")         //JSON web token
const db = require("../routes/db-config");  //database configuration
const { promisify } = require("util");      //util module

const mLoggedIn = async (req, res, next) => {
    if (req.cookies.managerSave) {
        try {
            //verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.managerSave, process.env.JWT_SECRET);
            console.log("LOGGED IN");

            //check if the user still exist
            db.query("SELECT * FROM manager_login WHERE id = ?", [decoded.id], (err, result) => {
                if(err) console.log(err);
                if(result == null) {
                    return next();
                }
                req.manager = result[0];
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

module.exports = mLoggedIn;