// This establishes an SMTP (Simple Mail Transfer Protocol) server.

const SMTPServer = require("smtp-server").SMTPServer; // Not a native module, npm install smtp-server

const PORT = 4321;

const server = new SMTPServer({
    disabledCommands: ["STARTTLS", "AUTH"], // disables Transport Layer Security (TLS), not to be disabled in production.
    logger: true // enables logging for our SMTP server.
});

server.on("error", (err) => {
    console.error(err);
})

server.listen(PORT); // note that the SMTPServer.listen() method can take three parameters, a port, a hostname, and a callback() function.