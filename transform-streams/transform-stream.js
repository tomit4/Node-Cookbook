const fs = require("fs");

const { Transform } = require("stream"); // Destructures the Transform object(?) from the stream module.

const rs = fs.createReadStream("./file.txt"); // Once again, we create a read stream from file.txt, which contains some dummy text

const newFile = fs.createWriteStream("./newFile.txt"); // And we create a write stream to a file yet to be created, newFile.txt

const uppercase = new Transform({ // a new Transform object is created, which takes a transform function as its argument
    transform(chunk, encoding, callback) { // confusing in that under the hood this calls a _transform function from Transform...
        // It takes the chunk of data, the kind of encoding and a callback function as its main three arguments.
        // Data processing
        callback(null, chunk.toString().toUpperCase()); // thee callback function itself takes an error as its first argument which
        // we just pass null to for sake of brevity in this tutorial.  and then we pass the resolution, which is the chunk of data, converted
        // to a string, and also converted to upper case.
    },
});

rs.pipe(uppercase).pipe(newFile); // we then call on the rs.pipe() method to pipe the returned value of uppercase to the newFile stream.

// The newFile.txt file should now be created. If cat is called upon newFile.txt in the command line, you will get the text from file.txt 
// presented in upper case.