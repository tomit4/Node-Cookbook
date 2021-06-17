// This simple program is meant to demonstrate the basics of a Cross Site Scripting (XSS) attack and how to prevent it.

const express = require("express");
const app = express();

validateParameters = ({ previous, token, lang }, query) => {
    return(
        Object.keys(query).length <= 3 &&
        typeof lang === "string" &&
        lang.length === 2 &&
        typeof token === "string" &&
        token.length === 16 &&
        typeof previous === "string" &&
        previous.length <= 16
    );
};

app.get("/", (req, res) => {
    const { previous, lang, token } = req.query;

    if (!validateParameters({ previous, token, lang }, req.query)) {
        res.sendStatus(422);
        return;
    }

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

// This server utilizes very specific parameters under the validateParameters() function to specify what types of parameters can be passed through our URL to further mitigate
// risk of an XSS attack.

// The following can be inputed once node constraints-server.js is run, each should fail, returning a message of: "Unprocessable Entity".

// http://localhost:3000/?previous=sixteencharacter&token=sixteencharacter

// http://localhost:3000/?previous=sixteencharacter&token=sixteencharacter&lang=en&extra=value

// http://localhost:3000/?previous=sixteencharacter&token=sixteencharacter&lang=abc

// The following URL should work as it satisfies the constraints put on us by our validateParameters() function:

// http://localhost:3000/?previous=sixteencharacter&token=sixteencharacter&lang=en

// It works, but since the website doesn't exist, it simply brings us to a Cannot Get/ page, but at least it's a legit website that didn't redirect us anywhere malicious.