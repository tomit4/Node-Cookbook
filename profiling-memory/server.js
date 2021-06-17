const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Hello World!");
    // server.setMaxListeners(1); // this would restrict the amount of requests 
    // our server could listen for, in this case, we can only receive one HTTP request before crashing
});

server.on("connection", () => {
    console.log("connected");
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});