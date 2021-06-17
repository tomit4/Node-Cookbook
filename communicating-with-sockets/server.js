// This is a demonstration of a basic setting up of a server and a client completely within node using sockets over a TCP Connection.
// TCP stands for "Transmission Control Protocol" and is one of the predominant protocols used over the web these days.
// This simple program simply uses NodeJS's native net module to create a server, and write back to the client once a connection is made.

const net = require ("net");

const HOSTNAME = "localhost";
const PORT = 3000;

net
    .createServer((socket) => { //create a server with net's imported socket syntax, you also see this defined as 'sock'
    console.log("Client connected");
    socket.on("data", (name) => { //once the socket is on, it listens from the client for a parameter to be passed called "data"
        // whatever is written to the stndout from the client side using socket.write() will be the parameter passed as name.
        socket.write(`Hello ${name}`); // then the stndout will display 'Hello ' followed by the passed name from the client
    });
    }).listen(PORT, HOSTNAME); // note the similarities with expressJS's app.listen syntax.