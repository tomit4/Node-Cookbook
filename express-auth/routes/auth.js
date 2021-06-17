const { Router } = require("express");
const router = Router();

router.get("/login", (req, res, next) => { // instructs the browser to send a GET request to /login
    res.render("login", {fail: false}); // and render the login.ejs page, setting its fail key to the property false
});

router.post("/login", (req, res, next) => { // instructs the browser to send a POST request to /login
   if (req.session.user) { // note the use of express-session here, if the POST request includes a user input
        res.redirect("/"); // redirect them to the / directory
        next(); // and continue...
        return; // and return(?) ...
    }
    if (req.body.username === "beth" && req.body.password === "badpassword") { // if the username and password match these string values (bad practice)
        req.session.user = { name: req.body.username }; // the user's name property is set to the inputted username from the body of the login.ejs page
        res.redirect("/"); // again, redirect to the / directory
        next(); // and continue...
        return; // and return(?) ...
    }

    res.render("login", { fail: true }); // if the user doesn't exist, or there was no input from the user, render the login page, with the fail property
    // set to true, this will invoke the ejs condition if (fail) { <p> Login Failed </p>} to be invoked
    next(); // and continue.
});

router.get("/logout", (req, res, next) => { // after the POST request is complete, a GET request is sent for the /logout page
    req.session.user = null; // and the express-session's user property is set to null (there is no user data anymore)
    res.redirect("/"); // and we're redirected to the home page where our login credentials are again prompted for.
});

module.exports = router; // export the router to the main server.js file so that these GET and POST methods can be utilized upon
// rendering of the index.ejs page once we start our server.js