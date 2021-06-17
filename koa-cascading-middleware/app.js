const Koa = require("koa");
const app = new Koa;

app.use(async (ctx, next) => {
    console.log("First middleware start"); // first thing we do is simply console.log the start of this function
    await next(); // then we await the next function...
    console.log("First middleware return");
});

app.use(async (ctx, next) => {
    console.log("Second middleware start"); // after awaiting teh first function, we log the start of this function
    await next(); // and await for the next function to return
    console.log("Second middleware return");
});

app.use(async (ctx, next) => {
    console.log("Third middleware start"); // finally we call this function and log the start of it...
    console.log("Third middleware return"); // and then log this before returning this function, and thusly cascading back upwards
    // through the function calls.
});

app.listen(3000);

// node app.js
// go to browser and input localhost:3000

//returns in terminal:
//First middleware start
//Second middleware start
//Third middleware start
//Third middleware return
//Second middleware return
//First middleware return