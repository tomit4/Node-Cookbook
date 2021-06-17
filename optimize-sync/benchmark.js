const benchmark = require("benchmark"); // npm install benchmark
const slow = require("./slow");
const loop = require("./loop");
const suite = new benchmark.Suite(); // initialize a new benchmark suite to contain our methods to test/compare.
const maxNumber = 100; // number to pass through to sumOfSquares()

suite.add("slow", function () { // add our methods...
    slow(maxNumber);
});

suite.add("loop", function () { // add our methods ...
    loop(maxNumber);
});

suite.on("complete", printResults); // once our benchmark suite has been tested, print the results using our function defined below.
suite.run(); // run the benchmark test.

function printResults() {
    this.forEach((benchmark) => {
        console.log(benchmark.toString()); // returns slow x <bignumber> ops/sec +-<0.something>% (90something runs sampled).
    });
    console.log("Fastest implementation is", this.filter("fastest")[0].name); // filter out the ones whose
    // benchmark's "fastest" method returns, and then return the first one in the array's name value (ie the fastest of them all).
}