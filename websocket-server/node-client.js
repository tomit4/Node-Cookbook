// This would be an even more basic form of a websocket handshake being demonstrated without a browser.

const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000"); // client waits and listens for data from localhost:3000

ws.on("open", () => { // on establishment of connection, post to the client "Connected".
    console.log("Connected");
});

ws.on("close", () => { // Upon closing of the connection, tell the user "Disconnected".
    console.log("Disconnected");
});

ws.on("message", (message) => { // Upon the event "message", take the data received as a message argument, and display it.
    console.log("Received:", message);
});

setInterval(() => { // set an Interval timer..
    ws.send("Hello"); // where we send the string "Hello" to the server (displayed in the CLI)..
}, 3000); // every 3 seconds.