// Demonstrates authentication process using express-session to store session cookies.
// This creates a basic login page that asks for a username and password, which have the default values of
// "beth" and "badpassword"

const express = require("express");
// const bodyParser = require("body-parser"); // bodyParser deprecated, see below.
const session = require("express-session");
const { join } = require("path");

const index = require("./routes/index");
const auth = require("./routes/auth");

const app = express();

// Initialize Middleware
app.set("views", join(__dirname, "views")); // express sets itself to point to the views folder which holds our .ejs files
app.set("view engine", "ejs"); // and sets the view engine as using the ejs template

app.use( // implements express-session to create a session cookie to remember our user
    session({
        name: "SESSIONID", // important!! 
        // don't leave this blank as otherwise it will allow the user to fingerprint our server. security vulnerability.
        secret: "Node Cookbook", // a secret identifier, also don't leave blank!!
        resave: false,
        saveUninitialized: false
    })
);

app.use(express.urlencoded({ extended: false })); // bodyParser deprecated, use express.urlencoded instead

app.use("/", index);
app.use("/auth", auth);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});