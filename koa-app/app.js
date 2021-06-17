const path = require("path");

const Koa = require("koa");
const serve = require("koa-static");
const router = require("koa-router")(); // note that we invoke koa-router...
const index = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = new Koa;

app.use(serve(path.join(__dirname, "public")));

router.use("/", index.routes()); // here we register additional router instances to insantiate MOUNT points.
app.use(router.routes()); // and we pass those mountpoints to instruct KoaJS to use as middleware.

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});