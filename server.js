//imports
const express = require("express");         //express.js
const db = require("./routes/db-config");   //MySQL database
const app = express();
const cookie = require("cookie-parser");    //cookie parser
var path = require("path");

//files from public folder
app.use(express.static(path.join(__dirname, "/public")));

//set views to ejs
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(express.json());

//connection to MySQL database
db.connect((err) => {
    if (err) console.log(err);
    else console.log("MYSQL CONNECTED");
});

//define routes
app.use("/", require("./routes/pages"));

app.use("/user", require("./routes/user"));
app.use("/user/payment", require("./routes/payment"));
app.use("/user/feedback", require("./routes/feedback"));
app.use("/user/analysis", require("./routes/analysis"));

app.use("/manager", require("./routes/manager"));

app.use("/auth", require("./controllers/auth"));

//http://localhost:3000 
app.listen(3000);
//Server listening at port 3000