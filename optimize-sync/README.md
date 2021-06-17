This basic benchmarking application benchmarks two different functions that both iterate over an array of 100 numbers and
return an array of those numbers squared, and then adds them all together.

Each function is placed in its own .js file so that it can be exported to a benchmarking program, called benchmark.js, where it can use a npm module called benchmark to compare the efficiency of each exported function and determine which is a less computationally intensive task (and therefore the better method).

In this case we also utilize 0x flamegraph to display where we are having a CPU bottleneck (it identifies it down to the line).

In the case of our slow function in slow.js, it uses both map and reduce to loop over an array and return our desired results, but because both are higher order arrays, and there are multiple calls to them , this is computationally expensive, whereas a simple for loop, found in loop.js is a less computationally intensive method of accomplishing the same task.

Modules needed for this would simple be benchmark:

npm install benchmark