// This simple calculator program is what will be loaded for testing using the tape module.
// tape will require us to export the functions we wish to test.

module.exports.add = (number1, number2) => {
    return number1 + number2;
};

module.exports.subtract = (number1, number2) => {
    return number1 - number2;
};

module.exports.multiple = (number1, number2) => {
    return number1 * number2;
};

module.exports.divide = (number1, number2) => {
    return number1 /  number2;
};