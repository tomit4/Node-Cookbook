const express = require("express");
const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// node post-server.js
// autocannon --connections 100 --method POST --headers 'content-type=application/json' --body '{ "hello": "world" }' http://localhost:3000/