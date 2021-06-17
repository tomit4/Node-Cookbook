//  This program creates a simple webpage that allows the user to submit their name, and also using a module called formidable that
// can read multiple files and submit them to be stored elsewhere (in this case in subdirectory called /uploads).  It then will return 
// a JSON object that provides information about the file that was uploaded.

const fs = require("fs");
const http = require("http");
const path = require("path");

const form = fs.readFileSync(path.join(__dirname, "public", "form.html")); // not much new here, once again we use path and fs to point to an html file in the public subdirectory.

const formidable = require("formidable"); // import formidable

http // create an http server
    .createServer((req, res) => {
        if (req.method === "GET") {
            get (res);
            return;
        }
        if (req.method === "POST") {
            post(req, res);
            return;
        }
        error (405, res);
    })
    .listen(3000);

function get(res) {
    res.writeHead(200, {
        "Content-Type": "text/html", // note the content type being pointed to is text/html
    });
    res.end(form); // return the results of getting the form.html file
}

function error(code, res) { // error handling...
    res.statusCode = code;
    res.end(http.STATUS_CODES[code]);
}

function post(req, res) {
    if (!/multipart\/form-data/.test(req.headers["content-type"])) { // this was confusing at first but...
        // note that the multipart/form-data is the enctype set in the form.html file
        // the enctype attribute specifies how the form-data should be encoded when submitting it to the server.
        // note that the enctype attribute can be used only if method="post".
        
        // basically, if the multipart/form-data's datatype, when "tested" against the req.headers["content-type"], returns FALSE (ie they don't match)...
        error(415, res); // then we throw an Unsupported Media Type Error ..
        return; // and we end the program.
    }
    // otherwise, if they are the same content type (ie content-type is set to json, and the form-data is passed is also json), then ...
    const form = formidable({ // the form.html which is what is displayed at the home directory / is changed over to whatever is returned by the formidable module
        multiples: true, // formidable.multiples set to true will allow multiple files to subnmitted...
        uploadDir: "./uploads" // and where those files are uploaded to is this directory: ./uploads
    });

    form.parse(req, (err, fields, files) => { // the resulting form returned to us by formidable is then parsed ...
        if (err) return err; // first we check if there's an error, and return it if there is..
        res.writeHead(200, { // then we write the results to the header upon receipt of a 200 OK status
            "Content-Type": "application/json", // where the results are returned as JSON content-type...
        });
        res.end(JSON.stringify({fields, files})); // and once parsed, the data ends by returning a JSON object, converted to string,
        // where formidable has returned us both a fields and a files objects...
    });
}