//imports
const jwt = require("jsonwebtoken");        //JSON web token
const db = require("../routes/db-config");  //database configuration

const login = async (req, res) => {
    //request username and password from webpage body
    const { username, password } = req.body;
    //return data from database where username is equivalent
    var query = "SELECT * FROM user_login WHERE username = ?; "
    + "SELECT * FROM manager_login WHERE username = ?";
    db.query(query, [username, username], async (err, rows) => {
        if(err) console.log(err);
        console.log("LOGIN");
        const user = rows[0][0];
        const manager = rows[1][0];
        //if username not found in the database, return to /login
        if (user == null && manager == null) {
            res.render("Wlogin", {message: "Incorrect Username", format: "alert"});
        //if username and password correct as an user account
        } else if (!(user == null) && password == user.password){
            const id = user.id;

            //create token
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            //set cookie expire time
            const cookieOptions = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("userSave", token, cookieOptions);
            console.log("Successfully logged in");
            res.status(200).redirect("/user");
        //if username and password correct as a manager account
        } else if (!(manager == null) && password == manager.password){
            const id = manager.id;

            //create token
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            //set cookie expire time
            const cookieOptions = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("managerSave", token, cookieOptions);
            console.log("Successfully logged in");
            res.status(200).redirect("/manager");
        //if password incorrect
        } else {
            //render login page and display "Incorrect Password" in alert
            res.render("Wlogin", {message: "Incorrect Password", format: "alert"});
        }
    });
}

module.exports = login;