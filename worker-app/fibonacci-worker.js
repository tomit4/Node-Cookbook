const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require("worker_threads");

const n = 10;
// Fibonacci calculator
const fibonacci = (n) => {
    let a = 0, b = 1, next = 1, i = 2;
    for (i; i <= n; i++) {
        next = a + b;
        a = b;
        b = next;
    }
    return next;
};

if (isMainThread) {
    // Main thread code
    const worker = new Worker(__filename, {
        workerData: n,
    });
    worker.on("message", (msg) => {
        console.log(`The Fibonacci number at position ${n} is ${msg}`);
    });
    console.log("...");
} else {
    // Worker code
    parentPort.postMessage(fibonacci(workerData));
}

// Returns from node fibonacci-worker.js
// ...
// The Fibonacci number at position 10 is 55

// Note the difference between this and the results from fibonacci.js
// The Fibonacci number at position 10 is 55
// ...

// This is due to the fact that we have created the main thread above, the fibonacci method, using the worker_threads module, we are able
// to distinguish between which threads are running in the background while we run our main thread.
// the worker code runs and posts the "message" which si the returned results from the fibonacci method running the worker data (which is defined
// in the main thread as the global variable n, which is hard-coded to the number 10), thusly the main thread will continue to run and return the console.log("...")
// the worker has received its "message", once it has, it will then progress to the console.log(`The Fibonacci number ... etc.`);