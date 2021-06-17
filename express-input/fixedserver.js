const express = require("express");
const app = express();

app.get("/", (req, res) => {
    asyncWork(() => { // ok, now we can fix our multiple http msg inputs
        let msg = req.query.msg; // first, some syntactical sugar to shorten our query's msg field
        if (Array.isArray(msg)) msg = msg.pop(); // and now we test to see if we have an array of msg strings instead of a message, 
        // if so, then our msg will always be the last one the user inputted, this is returned by the pop method.
        const upper = ( msg || "").toUpperCase(); // then we continue converting it to uppercase, etc.
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

// now that we've addresed the fact that multiple inputs creates an array, and thusly breaks our toUpperCase() function, we can curl with multiple inputs and it should work:
// curl http://localhost:3000/\?msg\=hello\&msg\=world
// returns:
// WORLD