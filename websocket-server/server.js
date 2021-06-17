// This module creates a WebSocket connection.  The most common use of websockets appears on the surface to be for chat applications.
// The basic concept being that there is a client and a server side, each performing what is called a "handshake" which basically means
// The client and server are in sync with each other and can communicate in real time.

// This server.js file establishes a web socket 

const WebSocket = require("ws");

const WebSocketServer = new WebSocket.Server({ // server on port 3000
    port: 3000
});

WebSocketServer.on("connection", (socket) => { // waits for a connection
    socket.on("message", (msg) => { // upon receipt of data called message, the msg argument is passed through...
        if (msg === "Hello") socket.send("World!"); // and if the msg variable contains the string "Hello", the websocket will respond with "World",
        // This is essentially confirmation of the handshake referenced earlier.
        console.log("Received:", msg);
    });
});