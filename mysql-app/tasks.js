// This very basic program will create a database in MariaDB (or MySQL), create a table called tasks, and insert a single task, "Walk the dog." into it.
// It uses a standard auto incremental primary key as an id.
// Also note that it uses the default localhost as its ip address, and the default port number for mysql/mariadb which is 3306

const mysql = require("mysql"); // npm install mysql
require("dotenv").config(); // npm install dotenv

const db = mysql.createConnection({ // relatively self explanatory, creates a connection that uses dotenv to point to the .env file
    // host: 'localhost',
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD
    // ,database: 'my_db'
});

db.query("CREATE DATABASE tasks;"); // the db.query() syntax allows us to pass raw SQL queries to mariadb/myqsl
db.query("USE tasks;"); // note that this could also be invoked by "\u tasks" in the mariadb CLI

// Here we create a table and create a column called id, which takes in an integer, not null (ie must be filled), and auto-increment counts as we create more rows.
// We also create a column called task, which is text, not null.
// The primary key is set to the id column
db.query(`
CREATE TABLE tasks.tasks (
    id INT NOT NULL AUTO_INCREMENT,
    task TEXT NOT NULL, PRIMARY KEY (id));
`);

// Some simple error handling, if mariadb/mysql sends back an error because when we run tasks.js the database can't be created or the table can't be created because 
// either the database or the table tasks already exists, then we create a variable called ignore that takes in a set of those error messages as its value.

const ignore = new Set([
    "ER_DB_CREATE_EXISTS", "ER_TABLE_EXISTS_ERROR"
]);

db.on("error", (err) => { 
    if (ignore.has(err.code)) return; // if mariadb/mysql receives an error message, then the db.query() methods above are stopped.
    throw err; // otherwise if the error is different than the one defined above, throw that error.
});

// Finally we insert some dummy data to test out our program
db.query(`
INSERT INTO tasks.tasks (task)
VALUES ("Walk the dog.");
`);

// And we use SQL to ask for mariadb/mysql to display our table tasks
db.query(`
SELECT * FROM tasks.tasks;
`, (err, results, fields) => { //  note the second argument here which takes in a function with three parameters, error, results, and fields..
    console.log(results); // we log the results to the console, which displays a JSON like object representative of our table of tasks
    db.end(); // and it's important that we then end the connection to mariadb/mysql once we're done.
});