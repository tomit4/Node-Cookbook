const express = require("express");
const he = require("he"); // Stands for HTML entities, "he" is a robust HTML entity encoder/decoder written in JS.
const escapeHTML = require("escape-html"); // npm install escape-html.  This module escapes html strings passed into our URL, and thereby prevents one form of XSS attacks.
const app = express();

app.get("/", (req, res) => {
    const { previous, lang, token } = req.query;
    getServiceStatus((status) => {
        const href = escapeHTML(`/${previous}${token}/${lang}`); // prevents the collection server from collection-server.js from accessing our data when we click the back button 
        // thusly preventing these inputs from affecting our webpage and possibly changing the page itself.  Here this will simply
        // bring us back to the home / directory.
        res.send(`
        <h1>Service Status</h1>
        <div id=status>
        ${status}
        </div>
        <div>
        <a href="${href}}">Back</a> <!-- Here is where he is input, so there shouldn't be any issue now. -->
        </div>
        `);
    });
});

getServiceStatus = (callback) => {
    const status = "All systems are running.";
    callback(status);
};

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// Now when we run the following, it should simply bring us back to our homepage without any changes.

// http://localhost:3000/?previous=%22%3E%3Cscri&token=pt%3Edocument.getElementById(%22status%22).innerHTML=%22All%20systems%20are%20down!%22;%3C&lang=script%3E%20%3Ca%20href=%22/

// Yep, no changes to our site! huzzah!!
