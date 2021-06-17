function sumOfSquares(maxNumber) {
    const array = Array.from(Array(maxNumber + 1).keys());

    return array.map((number) => {
        return number ** 2;
    })
    .reduce((accumulator, item) => { // if we run 0x flamegraph on this, we will find that 
        // this a CPU hotspot, we can rewrite it for better CPU resource management.
        return accumulator + item;
    });
}

module.exports = sumOfSquares;