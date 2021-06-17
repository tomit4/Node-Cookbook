// This simple program is a demonstration of how to use the express helmet middleware to "harden" our website from XXS attacks

const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(helmet()); // note that this has many parameters.

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server listening on port 3000"));

// once the server is running, in a seperate terminal window, run the following curl command:
// curl -i http://localhost:3000

// Comment out the app.use(helmet()); line above if you wish to see how this command would return a less secure website
// The settings changed by helmet can be done in raw javascript (rather than writing it out, simply see page 294 of Node Cookbook
// or go to: https://medium.com/@rajapradhan08/best-practices-for-securing-node-js-web-applications-2e54cfefdc05 for more details
// on how to secure NodeJS web apps)