//imports
const mysql = require("mysql");             //MySQL
const dotenv = require("dotenv").config();  //.env

//http://localhost/phpmyadmin

//connect to the database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,        //host
    user: process.env.DATABASE_USER,        //user
    password: process.env.DATABASE_PASSWORD,//password
    database: process.env.DATABASE,         //database
    multipleStatements: true                //allow multiple statements
});

module.exports = db;