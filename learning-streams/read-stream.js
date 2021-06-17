// From the file.txt, we create a read stream using the fs module, and upon receiving data from the stream,
// we console log the data until the stream ends.
// Essentially this whole program creates a file.txt, writes a string to it one million times, and then this file reads it,
// And displays it to the console ... one million times...

const fs = require("fs");

const rs = fs.createReadStream("./file.txt"); // creates a read stream to file.txt

rs.on("data", (data) => { // once the data is streaming, the read data is passed through the following function:
    console.log("Read chunk:", data.toString()); // Log the string "Read chunk:" to the console, followed by the passed data, converted to a string.
});

rs.on("end", () => { // once that filestream has ended..
    console.log("No more data."); // log "No more data" to the console.
});