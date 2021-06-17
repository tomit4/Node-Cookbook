const uppercase = require("./../uppercase");

describe("uppercase", () => {
    test("uppercase hello returns HELLO", () => {
        expect(uppercase("hello")).toBe("HELLO");
    });
});

// note that we have written into our package.json file the following unders scripts:
// "test": "jest"

// this allows us to test our uppcase.js function by running:
// npm jest

// we also run a code coverage feature, which is more in depth:
// ./node_modules/jest/bin/jest.js --coverage
// I have taken the liberty of also putting this under our scripts in package.json as "coverage":
// so all you have to do is input:
// npm run coverage