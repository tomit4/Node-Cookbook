const assert = require("chai").assert;

const calculator = require("../calculator.js");

describe("Calculator Test", () => {
    describe("add() Test", () => {
        it("add(1,2) should return 3", () => { // it() method stands for individual test
            assert.equal(calculator.add(1, 2), 3);
        });
        it("add('1','2') should return 3", () => {
            assert.equal(calculator.add("1", "2"), 3);
        });
    })
});

// a little different way of invoking mocha/chai, we invoke it by executing from within the node modules:

// ./node_modules/mocha/bin/mocha (we'll put this as a run in your package-json so we can simply type npm run test or even simpler
// npm test)
// returns:
// Calculator Test
// [checkmark symbol] add(1,2) should return 3
// [in red highlighting] 1) add('1','2') should return 3