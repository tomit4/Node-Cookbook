process.stdin.on("data", (data) => { // uses NodeJS's process.stdin.on method to "listen" for something called "data"
    //processing on each data event
    const name = data.toString().trim().toUpperCase(); // once input has been given by the user in the terminal, it is converted to a String, trimmed, and converted to uppercase..
    if (name !== "") { // if the user passes us any text at all..
        process.stdout.write(`Hello ${name}!`); // and uses NodeJS's process.stdout.write method to display the text back to the user with "Hello" prepended to it.
    } else { // if the user doesn't type anything..
        process.stderr.write("Input was empty"); // use NodeJS's process.stderr.write method to display an error message.
    }
});

// Returns 'Hello BRIAN!' if you write brian in the terminal once the program is run with node greeting.js