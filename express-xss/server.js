// This simple program is meant to demonstrate the basics of a Cross Site Scripting (XSS) attack and how to prevent it.


const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const { previous, lang, token } = req.query;
    getServiceStatus((status) => {
        res.send(`
        <h1>Service Status</h1>
        <div id="status">
        ${status}
        </div>
        <div>
        <a href="${previous}${token}/${lang}">Back</a>
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


// Below is an example of a XSS injection.  All the user has to do is input this lengthy adjustment and they can make changes to our site.
// This one is relatively harmless as all it does is change the innerHTML contents of our div status, but it shows the possibility of someone creating
// A fake website which can then take credentials/data from our users who unknowingly are no longer at our website.

// http://localhost:3000/?previous=%22%3E%3Cscri&token=pt%3Edocument.getElementById(%22status%22).innerHTML=%22All%20systems%20are%20down!%22;%3C&lang=script%3E%20%3Ca%20href=%22/

// See fixed-server.js for a solution to this.