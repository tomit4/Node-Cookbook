const http = require("http");
const Ajv = require("ajv"); // ajv is a JSON schema validator.
const ajv = new Ajv;

// A schema can be thought of as a sorty of set of properties that our validator, ajv will check against to determine if it has
// properties we expect/require
const schema = {
    title: "Greeting",
    properties: {
        msg: { type: "string" }, // this is where the validation happens that will stop our json-pollution attack,...
        name: { type: "string" }, // that are strings. 
    },
    additionalProperties: false, // here we set that no additional properties can be passed other than what we have defined above.
    required: ["msg"], // here we require that the object passed through our schema validator have at least the msg property.
};

const validate = ajv.compile(schema); // and here we compile the schema and contain it in a variable called validate.

const { STATUS_CODES } = http;

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/") {
        greeting(req, res);
        return;
    }

    res.statusCode = 404;
    res.end(STATUS_CODES(res.statusCode));
});

greeting = (req, res) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
        try {
            data = JSON.parse(data);
        } catch(e) {
            res.end("");
            return;
        }

        if (!validate(data, schema)) { // and here we pass the data that we've parsed into JSON above through our ajv validator, if it doesn't validate... 
            res.end(""); // then end the operation with an empty string (once again this does NOT stop the server, which is very important)
            return; // the operation may have stopped, but our server is still up and running waiting for other non malicious users to utilize our program.
        }

        if (data.hasOwnProperty("name")) {
            res.end(`${data.msg} ${data.name}`);
        } else {
            res.end(data.msg);
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

// #############################################################################

// Now if we run the same curl command that crashed our server:

// curl -H "Content-Type: application/json" -X POST -d '{ "msg": "Hello", "name": "Beth", "hasOwnProperty": 0 }' http://localhost:3000/

// No response is given, but our server is still running.  Good stuff.