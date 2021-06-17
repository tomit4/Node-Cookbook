// the rs.read() method is why this is part of the tutorial on paused streams.  The last infinite stream demonstration in infinite-read.js
// demonstrated a flowing stream of data that didn't need to be called to receive the data, as it came in infinitely from the urandom number generator.
// whereas here rs.read() must be called to receive the data.
// the essentials of this is one can think of readable streams being like pulling data from the stream, while flowing streams are like pushing data from the stream...

const fs = require("fs");

const rs = fs.createReadStream("./file.txt"); // once again, we create a read stream to our million mile file.txt

rs.on("readable", () => { // on the recognized string of "readable"
    // Read data
    let data = rs.read(); // we define a variable called data which holds the returned value of the stream's read() method.

    while (data !== null) { // a while loop that checks to see if there's still data...
        console.log("Read chunk:", data); // and returns that raw data back to the user via the console in the command line
        data = rs.read(); // and as long as there's more data, the new set of bytes/strings/data becomes what is held in the data variable
        // it continues until it has no more data to read.
    }
});

rs.on("end", () => { // once no more data has been received...
    console.log("No more data."); // let the user know.
})