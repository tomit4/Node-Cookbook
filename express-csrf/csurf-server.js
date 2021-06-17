const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const csurf = require("csurf"); // csurf inserts an anti CSRF (Cross Site Request Forgery) token into the user session, which mitigates an attack
// as it would require the attacker to access the session itself to carry out the attack.
const csrf = csurf();

const app = express();

const mockUser = {
    username: "beth",
    password: "badpassword",
    email: "beth@example.com",
};

app.use(
    session({
        secret: "Node Cookbook",
        name: "SESSIONID",
        resave: false,
        saveUninitialized: false,
        cookie: { sameSite: true }, // this line is what will prevent cross site request forgery (CSRF) attacks.
    })
);

app.use(express.urlencoded({ extended: false }));

// Define routes

app.get("/", (req, res) => {
    if(req.session.user) return res.redirect("/account");
    res.send(`
    <h1>Social Media Account - Login</h1>
    <form method="POST" action="/">
        <label> Username <input typee="text" name="username"> </label>
        <label> Password <input type="password" name="password"> </label>
        <input type="submit">
    </form>
    `);
});

app.post("/", (req, res) => {
    if (
        req.body.username === mockUser.username &&
        req.body.password === mockUser.password
    ) {
        req.session.user = req.body.username;
    }
    if (req.session.user) res.redirect("/account");
    else res.redirect("/");
});

app.get("/account", csrf, (req, res) => { // Note the addition of the csrf parameter
    if(!req.session.user) return res.redirect("/");
    res.send(`
        <h1>Social Media Account - Settings</h1>
        <p> Email: ${mockUser.email} </p>
        <form method="POST" action="/update">
        <input type="hidden" name="_csrf" value="${req.csrfToken()}">
        <!-- Note the name="_csrf" attribute, it inserts the token that would be required to be written into the "malware" to continue -->
        <input type="text" name="email" value="${mockUser.email}">
            <input type="submit" value="Update" >
        </form>
    `);
});

app.post("/update", csrf, (req, res) => { // Note the addition of the csrf parameter
    if (!req.session.user) return res.sendStatus(403);
    mockUser.email = req.body.email;
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// Now simply run the server: node csurf-server.js
// And Enter the default username and password: "beth" "badpassword"
// And change the email at the /account page: "beth2@example.com"
// From here go to your devtools in your browser by hitting F12.
// Checking the HTML, open up the forms field to see the csrf token in our hidden input field, this token would be necessary for the attacker to exploit the site at this point.

// While not perfect, the csurf token is another deterrent we as developers can add to our code to prevent malicious attacks such as Cross Site Request Forgery attacks.