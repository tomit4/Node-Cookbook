// This short program utilizes NodeJS's native Transform class with a key property named objectMode set to the value of true.  This allows
// the stream to return to us not bytes, but rather it allows us to return JSON objects.
// This program also uses a module from the npm called ndjson, from which we import teh stringify method.

const { Transform } = require("stream");

const { stringify } = require("ndjson");

const Name = Transform({
    objectMode: true, // again, this allows us to pass from the Transform class, JSON formatted objects instead of bytes.
    transform: ({ forename, surname }, encoding, callback) => { // note the formatting of defining the transform method, which takees an object of undefined keys called forename and surname
        callback(null, { name: forename + " " + surname }); // again, null takes the place of our error argument, and otherwise we pass an object bacck with the namee key, which has a string that concatenates
        // the forename and an empty space " " and the surname.
    },
});

Name.pipe(stringify()).pipe(process.stdout); // the new Name class is then piped the stringified contents, which are then further piped to NodeJS's process.stdout method.

Name.write({ forename: "John", surname: "Dow"}); // and finally some JSON objects are written, which will then be piped to the process.stdout (ie displayed in the CLI)
Name.write({ forename: "Jane", surname: "Dow"});