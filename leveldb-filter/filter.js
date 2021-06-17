const levelup = require("levelup");
const leveldown = require("leveldown");

const db = levelup(leveldown("./data"));

db.put("Task:1", "");
db.put("Task:2", "");
db.put("Task:3", "");
db.put("Task:4", "");

db.createReadStream({
    gte: "Task:1", // gte stands for greater than or equal to
    lte: "Task:3" // lte stands for lesser than or equal to
}).on('data', function (data) {
    console.log(data.key.toString());
});

// node filter.js
// returns:
// Task:1
// Task:2
// Task:3