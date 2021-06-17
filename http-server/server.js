// Sets up a basic http server from which only GET requests can be made.

const http = require("http");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0"; // define the HOSTNAME as the process.env.HOSTNAME (ie localhost) OR the local ip address of 0.0.0.0
const PORT = process.env.PORT || "3000"; // define the PORT as the process.env.PORT (ie default PORT) OR port 3000.

// It is worth noting that the below function passes the response object, which is our created http server through a series of if statements that
// when passed, then pass the resolved server through a series of functions that further manipulate the response.  Within each of these functions the res.end() method
// passes a string as well as some data to the http.createServer() method, and because the return statement is used, the createServer() method ends when
// only one of the if statements is fulfilled, otherwise the error() function is invoked.
// The author of the book makes note that this is an example of a Stream object.

const server = http.createServer((req, res) => { // use http.createServer() method to, you guessed it, create a server...
    if (req.method !== "GET") return error (res, 405); // if the request.method is not a GET request... return as an error with the results and error message 405...
    if (req.url === "/todo") return todo(res); // if the requested url is followed by the /todo subdirectory, return the results passed through the todo function.
    if (req.url === "/") return index(res); // if the requested url is the home directory, then return the results passed through the index function.
    error(res, 404); // otherwise return the results passed through the error function, with the status code 404 as a seecond parameter.
});

function error(res, code) { // an error function that takes in the results, as well as a status code...
    res.statusCode = code; // the resulting statusCode key is set to the passed status code..
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`); // upon the end of the resolution, pass a string literal that displays "error: " followed by the status code.
}

function todo(res) { // a todo function, that upon resoolution's end...
    res.end(`[{"task_id": 1, "description": "walk dog"}]`); // returns an array with a single todo object in it.
}

function index(res) { // an index function, which upon resolution...
    res.end('{"name": "todo-server"}'); // returns a single object after it has resolved.
}

server.listen(PORT, HOSTNAME, () => { // then the created server listens on the passed PORT, looks for the passed HOSTNAME, and then invokes a callback function..
    console.log(`Server listening on port ${server.address().port}`); /// that logs to the console the string "Server listening on port " and then passes the port address...
});

// If we run node server.js... we will see logged to the console:
// Server listening on port 3000

// Then we can use the curl command to make a GET request like so:
// curl http://localhost:3000/
// which will return:
// {"name": "todo-server"}
// and if we use the curl command to make a GET request to the /todo subdirectory:
// curl http://localhost:3000/todo
// it will return:
// [{"task_id": 1, "description": "walk dog"}]