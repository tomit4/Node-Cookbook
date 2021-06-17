const net = require ("net");

const HOSTNAME = "localhost";
const PORT = 3000;

const socket = net.connect(PORT, HOSTNAME); // note the use of the .connect method, this contains the information of our connection
// and in this case is connected to the same port that the server is LISTENING on.

socket.write("World"); // the socket then writes to it's stndout the string "World" which is passed to the server, which then adds this next to the text "Hello "...


socket.on("data", (data) => { // Once the socket has been established and is on, both server.js and clientjs use the socket.on(("data")) to listen and connect for the same event represented by "data"
    // then a parameter called data is passed, which is finally logged to the console as a string, in this case displaying "Hello World" in the console.
    // Note that "data" is displayed in other tutorials as the string "connection", so please keep in m ind that socket.on is either trying to connect or listen for the same variable name.
    console.log(data.toString());
})