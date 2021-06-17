// This program demonstrates how a json-pollution attack can easily be implemented on a website, and also how to solve it.

const http = require("http");
const { STATUS_CODES } = http; // deconstructing the STATUS_CODES property from our http module.

const server = http.createServer((req, res) => { // create a simple http server using NodeJS's native http module.
    if (req.method === "POST" && req.url === "/") { // if the HTTP request method is a POST request, and the requested URL is the home directory /
        greeting(req, res); // invoke the greeting function defined below
        return;
    }

    res.statusCode = 404; // otherwise if no request is made, throw a 404 error
    res.end(STATUS_CODES(res.statusCode)); // and stop the operation (but not the server) showing the status code to the user/dev
});

greeting = (req, res) => {
    let data = ""; // let the inputted data be an empty string
    req.on("data", (chunk) => (data += chunk)); // upon an HTTP request, when the data type is received, let data equal that chunk of data...
    req.on("end", () => { //upon the end of that data stream...
        try {
            data = JSON.parse(data); // parse that data to JSON
        } catch(e) { // if an error occurs
            res.end(""); // stop the operation (but not the server) and return an empty string
            return; // and end the whole thing.
        }

        if (data.hasOwnProperty("name")) { // if the data has a property called "name"
            res.end(`${data.msg} ${data.name}`); // stop the server displaying the string literal of the msg and name properties' values.
        } else { // otherwise
            res.end(data.msg); // stop the operation (but not the server) just showing the data msg property's value (but not as a string(?)...)
        }
    });
};

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// To test this out, let's first start the server: node server.js
// Then use the curl command to POST some JSON to the server, note the use of 
// -X POST -d command to specify our HTTP request method and the -d argument to specify the input of data

// curl -H "Content-Type: application/json" -X POST -d '{ "msg": "Hello", "name": "Beth" }' http://localhost:3000/

// This returns: Hello Beth

// However, very much like our HTTP pollution situation, adding more parameters causes the server to crash:

// curl -H "Content-Type: application/json" -X POST -d '{ "msg": "Hello", "name": "Beth", "hasOwnProperty": 0 }' http://localhost:3000/

// returns: Empty reply from server
// and crashes our server outright...again, very bad.
// this happens because the "hasOwnProperty" value overrides the native JSON .hasOwnProperty() method and since it is used in our greeting
// method, the server is unable to start due to an error happening on line 25...
// exactly WHY this crashes the server is still a bit of a mystery to me here, but nevertheless it is very undesirable behavior.

// see the fixed-server.js file for the solution.
