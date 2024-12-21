//imports
const express = require('express');     //express.js
const router = express.Router();

//connects to the pages

//http://localhost:3000
router.get('/', (req, res) => {
    res.render("Wpage");
    console.log("DISPLAY /");
});

//http://localhost:3000/login
router.get('/login', (req, res) => {
    res.render("Wlogin", {message: null, format: "login"});
    console.log("DISPLAY /login");
});

//http://localhost:3000/pay
router.get('/pay', (req, res) => {
    res.render("Wpay");
    console.log("DISPLAY /pay");
});

//http://localhost:3000/QRcode
router.get('/QRcode', (req, res) => {
    var qrcode = req.query.type;
    if(qrcode=="seasonal"){
        res.render("Wqr_seasonal");
    } else if(qrcode=="semiannual"){
        res.render("Wqr_semiannual");
    } else if(qrcode=="annual"){
        res.render("Wqr_annual");
    }
});

module.exports = router;