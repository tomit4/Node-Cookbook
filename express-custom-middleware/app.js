const express = require("express");
const path = require("path");
const index = require("./routes/index");

// npm install ejs
// note that we do not need to import ejs as express does this for us...

const logger = require("./middleware/logger"); // custom middleware that logs the type of request made by the client (GET request) and also the route it is requesting from (/ or /styles.css)

const PORT = process.env.PORT || 3000;

const app = express();

// Here we instruct our ExpressJS server to use a view engine by adding the following lines..

app.set("views", path.join(__dirname, "views")); // this is by default, but to be explicit, we set the "views" engine to look directly in our views subdirectory
app.set("view engine", "ejs"); // this might as well stand in for require ejs... it basically sets the view engine to use the ejs module.

// Middleware
// Note that the ordering of our middleware is important, if for example there were two MOUNT points, then the first MOUNT point
// would take precedence over the second.

app.use(logger());

app.use(express.static(path.join(__dirname, "public"))); //accesses our styles.css file by calling express.static, 
// this creates a WRITE STREAM from "public" and passes that to the requested object, which is our main directory(?)...
app.use("/", index); // accesses and uses our index.js file from the main directory, this is our MOUNT POINT for the middleware
// followed by index.js in our routes subdirectory, this establishes this as the ExpressJS router.

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

