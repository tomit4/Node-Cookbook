// This program is used to illustrate basic http GET and POST requests. It utilizes NodeJS's native http module,
// and demonstrates the use of postman as a testing ground for such requests.
// Note that any of this can also be done utilizing NodeJS's native https module, which uses the https protocol, simply replace all isntances off http with https.

const http = require("http");

// A standard GET request, where the first parameter is the site we wish to GET from, and the second parameter being a callbackfunction, that simply pipes the results to the standard output (CLI)
// http.get("http://example.com", (res) => res.pipe(process.stdout));

// Note the use of backticks to indicate that even though we have JSON here, it is NOT an object that we pass to the headers object below
const payload = `{
    "name": "Beth",
    "job": "Software Engineer"
}`;

const opts = { // operations object with JSON...
    method: "POST", // a POST request
    hostname: "postman-echo.com", // the hostname of where we are posting to..
    path: "/post", // the path, so in this case the site would be http://postman-echo.com/post
    headers: {
        "Content-Type": "application/json", // we are passing a JSON type of data
        "Content-Length": Buffer.byteLength(payload) // and the payload is to be parsed through the Buffer.byteLength() method...
    },
};

const req = http.request(opts, (res) => { // an http request is made, through which we pass our opts POST request, which upon resolution...
    process.stdout.write("Status Code: " + res.statusCode + "\n"); // will write to our standard output the string "Status Code: ", the status code, and a line break.
    process.stdout.write("Body: "); // then the standardoutput will also give us the string "Body: "
    res.pipe(process.stdout); // upon resolution the results are piped to the standard output (i.e. the CLI)
});

req.on("error", (err) => console.error("Error: ", err)); // otherwise, if upon resolution, there is an error, log that error to the console along with the error message.

req.end(payload); // call the http request with the payload passed as its parameter (ie it passes a stringified JSON object, posts it to http://postman-echo.com/post, and then
// writes that post request to the standard output)