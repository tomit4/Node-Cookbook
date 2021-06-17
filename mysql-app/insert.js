const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD
});

db.query("CREATE DATABASE tasks;");
db.query("USE tasks;");

db.query(`
CREATE TABLE tasks.tasks (
    id INT NOT NULL AUTO_INCREMENT,
    task TEXT NOT NULL, PRIMARY KEY (id));
`);

const ignore = new Set([
    "ER_DB_CREATE_EXISTS", "ER_TABLE_EXISTS_ERROR"
]);

db.on("error", (err) => {
    if (ignore.has(err.code)) return;
    throw err;
});

// Supposedly, according to the book, this is useful in preventing SQL injection attacks, but really all I see is a way to write our tasks to be inserted into the CLI
// by invoking node insert.js "Wash the car." we insert a task with that string in its task column.
if (process.argv[2]) { // note the use of process.argv[2] here, this uses NodeJS's native process object.  Basically if the user passes anything to the CLI...
    db.query(
        `
        INSERT INTO tasks.tasks (task)
        VALUES (?);
        `, // note the use of the (?) which will then look to the second argument given and insert that  into the tasks table...
        [process.argv[2]] // which in this case is whatever the user enters into the CLI after invoking insert.js
    );
}

db.query(`
SELECT * FROM tasks.tasks;
`, (err, results, fields) => {
    console.log(results);
    db.end();
});