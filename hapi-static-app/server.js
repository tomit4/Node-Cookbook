const Hapi = require("@hapi/hapi");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const initialize = async () => {
    const server = Hapi.server({
        port: PORT,
        host: HOSTNAME
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: "GET",
        path: "/",
        handler: {
            file: path.join(__dirname, "files/file.txt")
        }

        // handler: function (request, h) {
        //     return h.file(path.join(__dirname, "files/file.txt"));
        // }
        
        // The following would allow us to access all files within the subdirectory "files" by simply typing something like:
        // localhost:3000/file.txt and
        // localhost:3000/another_file.txt and
        // localhost:3000/yet_another_file.txt
        // Here it is:

        // handler: {
        //     directory: {
        //         path: path.join(__dirname, "files");
        //     }
        // }


        // handler: (request, h) => {
        //   return "Welcome to Hapi";
        // }

    });

    await server.start();
    console.log("Server listening on", server.info.uri);
}

initialize();

// node server.js
// returns page that has the text from the file.txt file:
// This is a static file.