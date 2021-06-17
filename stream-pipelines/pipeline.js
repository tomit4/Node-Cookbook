// This program uses the pipeline method from the NodeJS's native stream module.  It acts very similar to the pipe method, but allows the chaining of methods, as well
// as allows for the logging of errors.

const fs = require("fs");

const { pipeline, Transform } = require("stream");

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        // Data processing
        callback(null, chunk.toString().toUpperCase());
    },
});

pipeline( // here we use the pipeline method to chain a read stream with a write stream and also creates some error handling functionality.
    fs.createReadStream("./file.txt"),
    uppercase,
    fs.createWriteStream("./newFile.txt"),
    (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        } else {
            console.log("Pipeline succeeded"); // this should work, so if all runs well, this is what you will see. newFile.txt should also 
            // exist with the text from file.txt inside of it, but upper case.
        }
    }
);

// the book also points out that the pipeline() can also call stream.destroy() to end any unterminated streams.