// This file demonstrates a little more of what's going on under the hood with the stream module's Transform object(?) class(?)

const fs = require("fs");
const { Transform } = require("stream");

const rs = fs.createReadStream("./file.txt");
const newFile = fs.createWriteStream("./newFile.txt");

class Uppercase extends Transform { // the class Uppercase is defined, which extends the Transform class...
    constructor() { // and adds a consructor() method..
    super(); // as well as a super() method..
    }

    _transform(chunk, encoding, callback) { // the _transform() method from Transform is called, 
        // taking in the data chunk, the encoding, and the callback function as parameters
        this.push(chunk.toString().toUpperCase()); // and then the Uppercase class has the chunk of data, converted to string and uppercase, passed back to it
        callback(); // and the callback() function is invoked.
    }
}

rs.pipe(new Uppercase()).pipe(newFile); // The new results from calling a new instance of the Uppercase class are piped to the newFile file.