// Essentially this creates a writeable stream that will write to a file called file.txt.  In this case
// it writes a string to file.js one million times...

const fs = require("fs");

const file = fs.createWriteStream("./file.txt"); // creates a write stream to file.txt
// Note that if file.txt doesn't exist, createWriteStream will create it.

for (let i = 0; i <= 1000000; i++) { // yep, one million times ...
    file.write( // write the following to the file.txt
        "Node.js is a Javascript runtime built on Google Chrome's V8 Javascript engine. \n"
    );
}