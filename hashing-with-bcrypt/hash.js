// A very simple demonstration of utilizing the bcrypt hashing module.

const password = process.argv[2]; // allows us to input a password after calling our hash.js file
const bcrypt = require("bcrypt"); // npm install bcrypt

const saltRounds = 10; // allows us to salt our hash, salts protect against brute force attacks

bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log(hash); // in production, we would then write this information to a database, like in the techedemic web tutorial.
});