//imports
const express = require('express');                     //express.js
const router = express.Router();
const db = require("../routes/db-config");              //database configuration
const loggedIn = require("../controllers/uLoggedIn");   //loggedIn function
const logout = require("../controllers/uLogout");       //logout function

router.get('/', loggedIn, (req, res) => {
    console.log("DISPLAY /user");
    if (req.user) {
        //request user ID
        const id = req.user.id;
        //counts the number of feedback at different states
        var query = "SELECT COUNT(state) AS count FROM feedback WHERE state = 'submitted' AND user_id = ?; "
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'processing' AND user_id = ?; "
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'accepted' AND user_id = ?; "
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'rejected' AND user_id = ?; "
        //counts the number of companies
        + "SELECT COUNT(DISTINCT company) AS count FROM analysis WHERE user_id = ?; "
        //calculates the total money spent
        + "SELECT SUM(stock*price) AS sum FROM analysis WHERE user_id = ?; "
        //finds the expiry date of payment
        + "SELECT MAX(expire) AS expire FROM payment WHERE user_id = ?";
        db.query(query, [id, id, id, id, id, id, id], (err, rows) => {
            if(err) console.log(err);
            //exchanges MySQL date to javascript date
            const exDate = new Date(rows[6][0].expire);
            const expire = ('0' + exDate.getDate()).slice(-2) + '/' + ('0' + (exDate.getMonth()+1)).slice(-2) + '/' + exDate.getFullYear();
            //passes data to webpage
            res.render("Uhome", {
                submitted: rows[0][0].count, 
                processing: rows[1][0].count,
                accepted: rows[2][0].count,
                rejected: rows[3][0].count,
                company: rows[4][0].count,
                total: rows[5][0].sum,
                expire
            });
        })
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.get('/profile', loggedIn, (req, res) => {
    console.log("DISPLAY /user/profile");
    if (req.user) {
        //render .ejs file
        res.render("Uprofile", {user: req.user});
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.get("/logout",logout);

module.exports = router;