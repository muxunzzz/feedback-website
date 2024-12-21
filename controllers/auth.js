//imports
const express = require("express");     //express.js
const router = express.Router();

//calling functions
const login = require("./login");
const uLogout = require("./uLogout");
const mLogout = require("./mLogout");
const mState = require("./mState");

//post action
router.post("/login", login);
//http://localhost:3000/auth/login

router.get("/user/logout", uLogout);
//http://localhost:3000/auth/user/logout
router.get("/manager/logout", mLogout);
//http://localhost:3000/auth/manager/logout

router.post("/feedback/update", mState);
//http://localhost:3000/auth/feedback/update

module.exports = router;