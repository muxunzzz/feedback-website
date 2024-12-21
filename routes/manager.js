//imports
const express = require("express");                     //express.js
const router = express.Router();
const db = require("../routes/db-config");              //database configuration
const loggedIn = require("../controllers/mLoggedIn");   //loggedIn function

router.get('/', loggedIn, (req, res) => {
    console.log("DISPLAY /manager");
    if (req.manager) {
        //request manager ID
        const id = req.manager.id;
        //returns the count from the database
        var query = "SELECT COUNT(id) AS count FROM user_login; "
        //counts the number of users
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'submitted'; "
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'processing'; "
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'accepted'; "
        + "SELECT COUNT(state) AS count FROM feedback WHERE state = 'rejected'";
        //counts the number of feedback at each state
        db.query(query, (err, rows) => {
            if(err) console.log(err);
            //passes the counts to webpage
            res.render("Mhome", {
                users: rows[0][0].count,
                submitted: rows[1][0].count, 
                processing: rows[2][0].count,
                accepted: rows[3][0].count,
                rejected: rows[4][0].count
            });
        });
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.get('/profile', loggedIn, (req, res) => {
    console.log("DISPLAY /manager/profile");
    if (req.manager) {
        //render .ejs file
        res.render("Mprofile", {manager: req.manager});
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.get('/users', loggedIn, (req, res) => {
    console.log("DISPLAY /manager/users");
    if (req.manager) {
        //returns all of the user information
        db.query("SELECT * FROM user_login", (err, result) => {
            if(err) console.log(err);
            //if no data is found then display message "No Data Found"
            if(result == null){
                res.render("Musers", {users: null, message: "No Data Found"});
            } else {
                //passes data to webpage
                res.render("Musers", {action: 'list', users: result});
            }
        });
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.get('/users/search', loggedIn, (req, res) => {
    console.log("DISPLAY /manager/users/search");
    //request the inputted target 
    var search = req.query.target;
    //search for alike usernames, names or surnames in the database
    const query = "SELECT * FROM user_login WHERE username LIKE '%"+search+"%' OR name LIKE '%"+search+"%' OR surname LIKE '%"+search+"%'";
    db.query(query, (err, result) => {
        if(err) console.log(err);
        //if no data is found then display message "No Data Found"
        if(result[0] == null){
            res.render("Musers", {users: null, message: "No Data Found"});
        } else {
            //passes data to webpage
            res.render("Musers", {action: 'list', users: result});
        }
    });
});

router.get('/users/:id', loggedIn, (req, res) => {
    //request user ID
    var id = req.params.id;
    console.log("DISPLAY /manager/users/"+id);
    if (req.manager) {
        //return data from the database
        const query = "SELECT * FROM user_login WHERE id = ?;"
        +"SELECT * FROM payment WHERE user_id = ?;"
        +"SELECT * FROM feedback WHERE user_id = ?;"
        +"SELECT * FROM analysis WHERE user_id = ?;";
        db.query(query, [id, id, id, id], (err, result) => {
            if(err) console.log(err);
            //passes all data relevant to the user
            res.render("MviewUser", {
                id, 
                user: result[0][0], 
                payment: result[1], 
                feedback: result[2], 
                analysis: result[3],
                message: "No Data Found"
            });
        });
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

router.get('/feedback', loggedIn, (req, res) => {
    console.log("DISPLAY /manager/feedback");
    if (req.manager) {
        //displays all feedback from database
        db.query("SELECT * FROM feedback", (err, data) => {
            if(err) console.log(err);
            if(data[0] == null){
                res.render("Mfeedback", {feedback: null, message: "No Data Found"});
            } else {
                //passes data to webpage
                res.render("Mfeedback", {action: 'list', feedback: data});
            }
        });
    } else {
        //if not logged in, redirect to login page
        res.status(401).redirect("/login");
    }
});

module.exports = router;