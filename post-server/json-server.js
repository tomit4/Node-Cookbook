// Currently throws an error 415, "Unsupported Media Type" -fixed it, document.forms[0] was typed as document.form[0] in form.html file.
// This program uses NodeJS to set up a basic http server from which both GET and POST requests are made.

const http = require("http");
const fs = require("fs");
const path = require("path");

const form = fs.readFileSync(path.join(__dirname, "public", "form.html")); // creates a variable called form which inside contains the results of the fs.readFileSync() method, which then
// uses the path.join() method to look for the sub-directory name, "public" inside it reads the form.html

http
    .createServer((req, res) => { // create a http server...
        if (req.method === "GET") { // if it is a GET request...
            get(res); // invoke the get() function defined down below...
            return; // and end the function.
        }
        if (req.method === "POST") { // if it is a POST request...
            post(req, res); // invoke the post() function defined down below...
            return; // and end the function.
        }
        error(405, res); // otherwise invoke the error function down below, passing a 405 error, and the resolution object.
    })
    .listen(3000); // and listen on port 3000.

function get(res) {
    res.writeHead(200, { // upon a successful resolution, write to the Headers the resolved content, which is defined as a "text/html" type
        "Content-Type": "text/html",
    });
    res.end(form); // and upon the resolved object being returned, pass it form.html
}

function post(req, res) {
    if (req.headers["content-type"] !== "application/json") { // if the requeste headers are not of this specific content type(a JSON object)...
        error(415, res); // call the error function with code 415 and the resolved object.
        return; // and end the function.
    }
    let input = ""; // let input equal an empty string.

    req.on("data", (chunk) => { // upon receipt fo the request (req.on()), take the data type, pass it through a callback function that takes a chunk parameter...
        input += chunk.toString(); // and let the input become that chunk of data as a string.
    });

    req.on("end", () => { // once the request has received an "end" message...
        const parsed = JSON.parse(input);

        if (parsed.err) {
            error(400, "Bad Request", res);
            return;
        }
        
        console.log("Received data: ", parsed); // log to the console the data chunk input string.
        res.end('{"data": ' + input + "}"); // and upon resolution of the POST request, return a successful status code(ie 'OK').
    });
}

function error(code, res) { // an error function that takes a status code and a results object as parameters...
    res.statusCode = code; // the results' statusCode key's value is set to the passed status code...
    res.end(http.STATUS_CODES[code]); // and upono the end of receiving the results, the http.STATUS_CODES object is passed the code parameter as its current status 
    // (status code should be 200)
}

// the curl method listed in the book didn't quite work with the use of backslashes,
// instead use the following:
// curl -H "Content-type: application/json" -X POST -d '{"forename":"Beth","surname":Griggs"}' http://localhost:3000/