const test = require("tape"); // npm install --save-dev tape

const calculator = require("./../calculator.js");

test("test add integers 1 and 2", (t) => { // note the syntax here, we have our message which announces the test we plan to make here..
    t.plan(1); // we invoke the plan() method, which declares the number of assertions to be run, in this case, if more than 1 assertions are made, then it will generate errors
    t.equal(calculator.add(1, 2), 3); // utilizes the equal() method to test if the function calcular.add(1, 2) is equal to its second argument, 3.
});// in this case it is, so it returns "ok 1 should be strictly equal", meaning that the test returned good, there were no more assertions than the first one "1",
// and that they should be strictly equal per the t.equal() method.


test("test add strings 1 and 2", (t) => { // same test is done...
    t.plan(1);
    t.equal(calculator.add("1", "2"), 3); // but with strings "1" and "2", which will in this case return "12" instead of the output we wanted, which is 3.
});// returns "not ok 2 should be strictly equal".

// to run either of these commands will do:
// node test.js
// npx tape test.js