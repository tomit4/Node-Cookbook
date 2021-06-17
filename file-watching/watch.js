const fs = require("fs");
const file = "./file.txt";
const moment = require("moment"); // not native to NodeJS, use npm

// A simple function that logs to the console whenever the file.txt was updated
// To demonstrate this, simply run 'node watch.js' in your terminal, and in your editor, edit and save the file.txt file
// the current.mtime shows the passed current parameter, which due to watchFile's defined method, displays the current time.
// mtime literally means "Greenwich Mean Time"

// fs.watchFile(file, (current, previous) => {
//     return console.log(`${file} updated ${(current.mtime)}`);
// });

// The following is a way of expressing this in a more human readable format.
// Note the use of the .format method from moment.  MMMM and Do and YYYY along with h:mm:ss a will display current month, day, year, and hours, minutes, seconds and am/pm 
//  This displays in the console something like:

// ./file.txt updated June 5th 2021, 1:42:42 pm

fs.watchFile(file, (current, previous) => {
    const time = moment().format("MMMM Do YYYY, h:mm:ss a");
    return console.log(`${file} updated ${time}`);
});