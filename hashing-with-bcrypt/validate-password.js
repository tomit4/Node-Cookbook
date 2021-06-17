// After having created a hashed password using hash.js, we can use validate-password.js to use bcrypt's compare method that will
// compare the passed password to the hash and return a boolean value on whether or not they match.

const password = process.argv[2]; // will ask for the password as a second parameter after our initial call to validate-password.js
const hash = process.argv[3]; // and the third parameter will be our hashed password returned from hash.js (copy and paste, put into single quotes '')

const bcrypt = require("bcrypt");

bcrypt
    .compare(password, hash) // returns a promise object that when resolved, returns a boolean true or false value
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.error(err.message)); // a simple error handler, if we for example forget to put two parameters, then bcrypt will output an error
    // asking for two parameters to compare