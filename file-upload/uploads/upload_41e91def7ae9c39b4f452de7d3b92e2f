const fs = require('fs'); // imports NodeJS's filesystem module
const path = require ('path'); // and also its path module

const filepath = path.join(process.cwd(), "hello.txt"); // invoke's the path module's join method, which takes NodeJS's process current working directory method
// as its first argument, and takes the hello.txt as it's second argument.

// console.log(filepath); // not part of the book's instructions, just wanted to see the path module in action...
// // outputs: /home/brian/Documents/Code/book_tutorials/node_cookbook/working-with-files/hello.txt

// const contents = fs.readFileSync(filepath, "utf8"); // uses the fs module to synchronously wait until the filepath's contents is resolved..
// console.log("File Contents:", contents); // once it is resolved it continues with the code, logging to the console the string "File Contents:", and then the contents itself, in this case 'Hello World'

// const upperContents = contents.toUpperCase(); // then after it is displayed the contents of the filepath, hello.txt, are converted to upper case..

// fs.writeFileSync(filepath, upperContents); // and then the fs module takes the filepath and synchronously waits for the file's text to be re-written with the text returned by upperContents..
// console.log("File updated."); //  and logs to the console the string "File updated."

// The above code is done using synchronous, blocking code, but NodeJS was designed with asynchronous programming in mind, so the following
// is the same as above, but written asynchronously.  Note that when we write asynchronous versions of the above, they require a callback function
// as a third argument.

fs.readFile(filepath, "utf8", (err, contents) => { // the asynchronous version of above, note the callback function, taking in the error and contents parameters
    if (err) { // if an error occurrs..
        return console.log(err); // log it to the console
    }
    console.log("File Contents:", contents);  // otherwise log the string "File Contents:" and the contents of the filepath to teh console.
    const upperContents = contents.toUpperCase(); // and thenc onvert it to Upper Case...

    setTimeout(() => updateFile(filepath, upperContents), 10);
    
    });


function updateFile(filepath, contents) {
    fs. writeFile(filepath, contents, (err) => { // the asynchronous version of above, again note the callback function, which this time just takes the err parameter
        if (err) throw err; // if an error occurrs, throw the error..
        console.log("File updated"); // otherwise log to the console the string "File updated"
    });
}


setInterval(() => process.stdout.write("**** \n"), 1).unref(); // then call teh setinterval method which in this case  outputs the string of asterixes plus a line break once every millsecond
// note the use of the unref method which exits the setInterval method once the process.stdout.write() method no longer returns any data to write.