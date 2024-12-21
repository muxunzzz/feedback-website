//imports
const express = require('express');                     //express.js
const router = express.Router();
const db = require("./db-config");                      //database configuration
const loggedIn = require("../controllers/uLoggedIn");   //loggedIn function

router.get('/', loggedIn, (req, res, next) => {
    console.log("DISPLAY /user/analysis");
    if (req.user) {
        //request for user ID
        const id = req.user.id;
        //select all analysis where user ID matches
        db.query("SELECT * FROM analysis WHERE user_id = ?", [id], (err, data) => {
            if(err) console.log(err);
            //when data is not found the message "No Data Found" will be displayed
            if(data[0] == null){
                res.render("Uanalysis", {analysis: null, message: "No Data Found", total: 0});
            } else {
                //counts the total number of analysis
                db.query("SELECT COUNT(*) AS count FROM analysis WHERE user_id = ?", [id], (err, rows) => {
                    if(err) console.log(err);
                    //passes data to webpage
                    res.render("Uanalysis", {action: 'list', analysis: data, total: rows[0].count});
                });
            }
        });
    } else {
        //redirect to login page if user not logged in
        res.status(401).redirect("/login");
    }
});

router.get('/add', loggedIn, (req, res) => {
    console.log("DISPLAY /user/analysis/add");
    if (req.user) {
        //render .ejs file
        res.render("UaddAnalysis");
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.post('/add', loggedIn, (req, res, next) => {
    //request input data
	const user_id = req.user.id;
    const company = req.body.company;
    const stock = req.body.stock;
    const price = req.body.price;

    //for the number of stocks
    for(var i=0; i<stock.length; i++){
        //inserts the input data into the database
        const query = `INSERT INTO analysis (user_id, company, stock, price) VALUES ("${user_id}", "${company[i]}", "${stock[i]}", "${price[i]}")`;
        db.query(query, (err) => {
            if(err) console.log(err);
        });
    }
    //redirect to view analysis page
    res.redirect("/user/analysis");
});

module.exports = router;