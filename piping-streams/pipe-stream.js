// A very simple program that simply takes the output of what is returned by the readstream of file.txt, which just contains some dummy text.

const fs = require("fs");

const rs = fs.createReadStream("file.txt");

rs.pipe(process.stdout); // and outputs it to the standard output, ie our CLI.

// Note that the pipe() method invokes stream.end() by default, you can disable this, keeping the proccess open, by appending it as so:

// sourceStream.pipe(destinationStream, {end: false});`