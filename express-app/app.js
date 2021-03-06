const express = require("express");
const path = require("path");
const index = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
// Note that the ordering of our middleware is important, if for example there were two MOUNT points, then the first MOUNT point
// would take precedence over the second.

app.use(express.static(path.join(__dirname, "public"))); //accesses our styles.css file by calling express.static, 
// this creates a WRITE STREAM from "public" and passes that to the requested object, which is our main directory(?)...
app.use("/", index); // accesses and uses our index.js file from the main directory, this is our MOUNT POINT for the middleware
// followed by index.js in our routes subdirectory, this establishes this as the ExpressJS router.

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

