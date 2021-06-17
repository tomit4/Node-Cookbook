const fastify = require("fastify")();

const PORT = process.env.PORT || 3000;

fastify.get("/", async (request, reply) => {
    return { message: "Hello World!" };
});

// A more verbose way of creating a GET request with fastify:

// fastify.route({
//     method: "GET",
//     url: "/",
//     handler: async (request, reply) => {
//         reply.send({ message: "Hello World!" });
//     }
// });

const startServer = async() => {
    try {
        await fastify.listen(PORT);
        console.log(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();