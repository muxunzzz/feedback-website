//imports
const express = require('express');                     //express.js
const router = express.Router();
const db = require("./db-config");                      //database configuration
const loggedIn = require("../controllers/uLoggedIn");   //loggedIn function

router.get('/', loggedIn, (req, res, next) => {
    console.log("DISPLAY /user/feedback");
    if (req.user) {
        //request user ID
        const id = req.user.id;
        //select feedback from database where user ID matches
        db.query("SELECT * FROM feedback WHERE user_id = ?", [id], (err, data) => {
            if(err) console.log(err);
            //if data is not found then display message "No Data Found"
            if(data[0] == null){
                res.render("Ufeedback", {feedback: null, message: "No Data Found", total: 0});
            } else {
                //counts the total number of feedback
                db.query("SELECT COUNT(*) AS count FROM feedback WHERE user_id = ?", [id], (err, rows) => {
                    if(err) console.log(err);
                    //passes data to webpage
                    res.render("Ufeedback", {action: 'list', feedback: data, total: rows[0].count});
                });
            }
        });
    } else {
        //redirect to login page if user not logged in
        res.status(401).redirect("/login");
    }
});

router.get('/add', loggedIn, (req, res) => {
    console.log("DISPLAY /user/feedback/add");
    if (req.user) {
        //render .ejs file
        res.render("UaddFeedback");
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.post('/add', loggedIn, (req, res, next) => {
    //request input data
	const user_id = req.user.id;
    const module = req.body.module;
    const detail = req.body.detail;
    const state = "submitted";

    //inserts new feedback into database
	const query = `INSERT INTO feedback (user_id, module, detail, state) VALUES ("${user_id}", "${module}", "${detail}", "${state}")`;

	db.query(query, (err) => {
		if(err) console.log(err);
		res.redirect("/user/feedback");
	});
});

module.exports = router;