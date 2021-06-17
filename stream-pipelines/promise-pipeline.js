// This program utilizes primarily the util.promisify() method to create a new Promise that awaits the returned results of stream.pipeline.
// This promise is then passed to an asynchronous function called run() that awaits for teh returned results of the stream.pipeline Promise, which upon resolution..
// creates a read stream from file.txt, converts it to uppercase via a stream.Transform() method, and then creates a write stream to newFile.txt
// We then invoke the run function with a catch clause for error handling.

const fs = require("fs");
const { join } = require("path");
const stream = require("stream");
const util = require("util");

const pipeline = util.promisify(stream.pipeline);

const uppercase = new stream.Transform({
    transform(chunk, encoding, callback) {
        // Data processing
        callback(null, chunk.toString().toUpperCase());
    },
});

async function run() {
    await pipeline(
        fs.createReadStream("./file.txt"),
        uppercase,
        fs.createWriteStream("./newFile.txt")
    );
    console.log("Pipeline succeeded.");
}

run().catch((err) => {
    console.error("Pipeline failed.", err);
});