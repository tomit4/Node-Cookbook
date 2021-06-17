const fs = require('fs');

const file = process.argv[2]; // read the filename as a command line argument, in this case it is looking for the second file in the current directory
// and in this case finds /.file.txt

// console.log(file); // prints the filepath.

function printMetadata(file) { // we take that filepath
    try {
    const fileStats = fs.statSync(file); // and invoke the fs.statSync method whcih takes the filepath as its first argument. 
    // statSync asynchronously returns information about the given filepath, this is what gives us the "metadata"
    console.log(fileStats); // show that metadata to the user
    } catch (err) {
        console.error("Error reading file path: ", file); // otherwise the book recommends this custom error message which is far more user friendly, while still providing  us with the filepath
        // basically if the user didn't provide an existing filepath, display this error
    }
}

printMetadata(file);