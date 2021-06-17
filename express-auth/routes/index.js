// Initializes our initial index page, the / page.
// This is standard with setting up a basic ExpressJS home page, it utilizes the router to
// route to the index.ejs file first

const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => { // upon our first GET request to the / directory...
    const user = req.session.user; // express-session's user data is stored in a variable user
    res.render("index", { user }); // and we render the index.ejs page, with the session's user data running in the background.
});

module.exports = router; // and export the router so that our server.js file can initialize it when called.