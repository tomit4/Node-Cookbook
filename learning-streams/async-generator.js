const { Readable } = require("stream");

async function* generate() { // note the asterix, which indicates that this is a generator function, which uses the yield syntax
    // generator functions are functions taht can be exited and later re -entered.
    // generator functions  are somewhat nuanced, in that when they invoked they return an iterator object with a method called next()
    // which calls on the next yield method that returns whatever follows it.
    // this generator function is rather simple in that every time generate() is called, it yields the next() value.
    yield "Node.js";
    yield "is";
    yield "a";
    yield "JavaScript";
    yield "Runtime";
}

const readable = Readable.from(generate()); // deconstructed from the stream module, stream.Readable, Readable.from() method takes the generate function as its argument
// as long as there is a yielded value returned by the generate function, Readable.from will stream that result...

readable.on("data", (chunk) => { // but only if it is called using the on() method.  Once again, as long as data continues to flow through the stream.
    console.log(chunk); // those chunks of data are returned, and in this case logged to the console.
});

// This displays the following when run in the console:
// Node.js
// is
// a
// Javascript
// Runtime