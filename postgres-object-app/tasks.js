// This basic program utilizes PostgreSQL along with NodeJS to create a simple table.
// This si the same as the postgres-app except we are passing JSON strings to PostgreSQL instead.

require("dotenv").config(); // also uses a dotenv file which includes our credentials such as our username, password, and porr number (default 5432)
const pg = require("pg"); // npm install pg
const db = new pg.Client(); // initialize a new PostgreSQL client...

const task = process.argv[2]; // and define all user input from the CLI within the variable task

// We are essentially shortening the syntax we will use later upon connecting to our database;
// This CREATE_TABLE_SQL is somewhat self explanatory.  Note the passing of doc jsonb is what allows us to pass JSON to PostgreSQL
const CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS tasks_docs
(id SERIAL, doc jsonb);`;

const INSERT_TASK_SQL = `INSERT INTO tasks_docs (doc) VALUES ($1);`; // Note the use of $1 here to indicate the input of parameters, in this case $1 correlates to task, 
// but if there were multiple rows of data to be inserted, say (task, time), then VALUES ($1, $2) would be their corresponding columns.

const GET_TASKS_SQL = `SELECT * FROM tasks_docs;`; // display the table tasks

//Where the magic happens, connect to the database...
db.connect((err) => {
    if (err) throw err; // lots of error handling here
    db.query(CREATE_TABLE_SQL, (err) => { // create a raw SQL query where we use our above variables to shorten our syntax
        if (err) throw err;
        if (task) { // if the user inputted a task into the CLI
            db.query(INSERT_TASK_SQL, [task], (err) => { // then insert that task, note the ordering of the arguments, and that task is inside square brackets []
                if (err) throw err;
                listTasks(); // invoke a function called listTasks() which is defined below and simply shows the table
            });
        }else {
            listTasks(); // even if the user doesn't enter anything in the CLI, we still display the tasks
        }
    });
});

// Function that displays the tasks using the variable GET_TASKS_SQL from above
function listTasks() {
    db.query(GET_TASKS_SQL, (err, results) => {
        if (err) throw err;
        console.log(results.rows);
        db.end(); // and also end the database connection once done.
    });
}

// and that's it, to test initiate with node tasks.js '{"task":"Walk the dog."}'