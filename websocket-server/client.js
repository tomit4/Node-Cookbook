// Notice that this sets up an http protocol server on the client side.

const fs = require("fs");
const http = require("http");

const index = fs.readFileSync("public/index.html");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html"); // sets the header "Content-Type" key with the value of text/html.
    res.end(index); // once index.html has been passed to the server, the result ends.
});

server.listen(8080); // establish listening for data to be passed to index.html on port 8080