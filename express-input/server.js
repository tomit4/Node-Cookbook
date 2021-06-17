const express = require("express");
const app = express();

app.get("/", (req, res) => {
    asyncWork(() => {
        const upper = (req.query.msg || "").toUpperCase();
        res.send(upper);
    });
});

asyncWork = (callback) => { // note that in a production application, this would be an asynchronous that would most likely query a database
    setTimeout(callback, 0);
};

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// to see this program in action, simple start the server:  node server.js
// then in a seperate terminal curl:
// curl http://localhost:3000/\?msg\=hello
// returns:
// HELLO

// note that a simple way to launch a DDOS attack is to input the query twice:
// curl http://localhost:3000/\?msg\=hello\&msg\=hello
// causes our server to crash!!...that's bad. see fixedserver.js for solution