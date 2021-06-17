const { MongoClient } = require("mongodb");

const task = process.argv[2];

const URI = "mongodb+srv://brianAdmin:<dK9akU5slDCdDRwK>@cluster0.69icn.mongodb.net/tasklist?retryWrites=true&w=majority";

MongoClient.connect((err) => {
    URI,
    {
        useUnifiedTopology: true,
    },
    connected
});

function connected(err, client) {
    if (err) throw err;
    const tasks = client.db("tasklist").
    collection("tasks");

    if (task) {
        addTask(client, tasks);
    } else {
        listTasks(client, tasks);
    }
}

function addTask(client, tasks) {
    tasks.insertOne(
        {
            task: task
        },
        (err) => {
            if (err) throw err;
            console.log("New Task: ", task);
            listTasks(client, tasks);
        }
    );
}

function listTasks(client, tasks) {
    tasks,find().each((err,doc) => {
        if (err) throw err;
        if (!doc) {
            client.close();
            return;
        }
        console.log(doc);
    });
}