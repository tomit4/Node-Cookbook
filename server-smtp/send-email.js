// Nodemailer is a simple email based module that sets up a an email client for servers established using the SMTP.

const nodemailer = require("nodemailer"); // Not a native NodeJS module, npm install nodemailer

const transporter = nodemailer.createTransport({ // all sent email should go over localhost, port 4321.
    host: "localhost",
    port: 4321
});

transporter.sendMail( // first argument is the email object itself.
    {
        from: "beth@example.com",
        to: "laddie@example.com",
        subject: "Hello",
        text: "Hello world!"
    },
    (err, info) => { //  the second argument is a simple error handeler, where info is an object displayed in the CLI about the email.
        if (err) {
            console.log(err);
        }
        console.log("Message Sent:", info);
    }
);