const fs = require("fs");

const rs = fs.createReadStream("/dev/urandom"); // creates a read stream to the /dev/urandom psuedorandom number generator special files.

let size = 0; //initialize the size as 0
rs.on("data", (data) => { // on receiving the read stream from urandom...
    size += data.length; // the size variable is added to itself plus the length of the incoming data
    console.log("File size:", size); // and console logs the file size, which increases forever...
})