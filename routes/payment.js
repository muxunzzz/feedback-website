//imports
const express = require("express");                     //express.js
const router = express.Router();
const db = require("./db-config");                      //database configuration
const loggedIn = require("../controllers/uLoggedIn");   //loggedIn function

router.get('/', loggedIn, (req, res, next) => {
    console.log("DISPLAY /user/payment");
    if (req.user) {
        //request user ID
        const id = req.user.id;
        //display all payment by user
        db.query("SELECT * FROM payment WHERE user_id = ?", [id], (err, data) => {
            if(err) console.log(err);
            //if no data is found then display message "No Data Found"
            if(data == null){
                res.render("Upayment", {payment: null, message: "No Data Found"});
            } else {
                //find the maximum expiry date of payment
                db.query("SELECT MAX(expire) AS expire FROM payment WHERE user_id = ?", [id], (err, rows) => {
                    if(err) console.log(err);
                    //exchanges MySQL date to javascript date
                    const exDate = new Date(rows[0].expire);
                    const expire = ('0' + exDate.getDate()).slice(-2) + '/' + ('0' + (exDate.getMonth()+1)).slice(-2) + '/' + exDate.getFullYear();
                    //passes data to webpage
                    res.render("Upayment", {action: 'list', payment: data, expire});
                });
            }
        });
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

module.exports = router;