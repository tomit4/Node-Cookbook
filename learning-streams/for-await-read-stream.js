const fs = require("fs");

const rs = fs.createReadStream("./file.txt"); // create a read stream to the million mile file.txt

async function run() { // create an asynchronous function called run...
    for await (const chunk of rs) { // where we await in a for loop each chunk of data from the read stream..
        console.log("Read chunk:", chunk.toString()); // and log the info (original book version didn't have to string, but you know what Byte code looks like)
    }
    console.log("No more data"); // once the for await loop is done, log "No more data"
}

run();