const http = require("http");

const server = http.createServer((req, res) => {
    server.on("connection", () => { // this is where our memory leak occurs, it registers the listener for the connected event
        // upon every request, causing our server to eventually run out of memory.
        console.log("connected");
    });
    res.end("Hello World!");
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});