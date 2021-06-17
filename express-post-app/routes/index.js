// I'll probably figure this out later, but essentially this doesn't work, you can find the information for this in the Node CookBook
// pages 164 -169.  I have made some small adjustments to it, but was unable to get it to work, essentially, the req.params is undefined in our
// router.get function below and it will not take the POST request and return a new webpage that greets the user by inputted name.

const express = require("express");
const router = express.Router();

// The router object provides methods that correspond with the HTTP protocol verbs (ie GET, POST, PUT, PATCH, and DELETE)
// Note that this router object is what is exported to app.js as middleware, but is also establishing the route to the website

router.get("/:name?", (req, res) => { // posting a GET request for the main directory
    const title = "Express"; // creating a variable that is meant to be the title of the website called "Express"
    const name = req.params.name;
    console.log(name);
    // The following sends out whatever html we pass to it
    res.send(`
    <html>
    <head>
    <title> ${title} </title> 
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <h1> ${title} </h1>
    <p> Welcome to ${title}${name ? `, ${name}.` : ""}</p>
    <form method="POST" action="data">
        Name: <input name=name><input type="submit" value = "Submit">
    </form>
    </body>
    </html>
    `)
});

router.post("/data", function(req, res) {
    res.redirect(`/${req.params.name}`);
});

// We then export the object returned by the object to our app.js file where it is used within the app.use("/", index) middleware function.
module.exports = router;