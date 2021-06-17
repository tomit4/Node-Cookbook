const router = require("koa-router")(); // note that we invoke koa.router...

router.get("/", async function(ctx) { // the router takes a context object, in this case we pass it an HTML string.
    // note the use of the GET syntax and also the use of an ASYNCHRONOUS function definition.
    const title = "Koa.js";
    ctx.body = `
    <html>
    <head>
    <title> ${title} </title>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <h1> ${title} </h1>
    <p> Welcome to ${title} </p>
    </body>
    </html>
    `;
});

module.exports = router;