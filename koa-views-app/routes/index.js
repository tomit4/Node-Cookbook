const router = require("koa-router")(); // note that we invoke koa.router...

/*
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
*/

// the render() function below is brought in by the koa-views middleware, where we pass "index.ejs" as the template we wish to use,
// the koa-views middleware knows to search our /views subdirectory for this file

router.get("/", async function (ctx, next) {
    //ctx.state = { // the koa template ctx.state is populated with key/value pairs that are referenced in our index.ejs file
    //    title: "Koa.js"
    //};
    await ctx.render("index", {title: "Koa.js"}); // we also could have passed the the title value as a second parameter here instead of calling ctx.state.
});

module.exports = router;