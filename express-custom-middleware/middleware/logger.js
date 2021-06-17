// A logger generally returns HTTP requests in this case.

module.exports = logger;

function logger() {
    return (req, res, next) => {
        console.log("Request received:", req.method, req.url); // the logger logs to the console the req.method(ie GET) and the requested url (/ or /styles.css)
        next();
    };
}