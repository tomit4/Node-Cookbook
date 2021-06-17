const express = require("express");
const router = express.Router();

// The router object provides methods that correspond with the HTTP protocol verbs (ie GET, POST, PUT, PATCH, and DELETE)
// Note that this router object is what is exported to app.js as middleware, but is also establishing the route to the website

router.get("/", (req, res) => { // posting a GET request for the main directory
    const title = "Express"; // creating a variable that is meant to be the title of the website called "Express"
    // The following sends out whatever html we pass to it
    res.send(`
    <!--Even comments can be passed and not seen, obviously we would want to send an html file here...
    usually imported from a views subdirectory-->
    <html>
    <head>
    <title> ${title} </title> <!--this is just a little bit of text to be styled here ${title} -->
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <h1> ${title} </h1>
    <p> Welcome to ${title} </p>
    </body>
    </html>
    `)
});

// We then export the object returned by the object to our app.js file where it is used within the app.use("/", index) middleware function.
module.exports = router;