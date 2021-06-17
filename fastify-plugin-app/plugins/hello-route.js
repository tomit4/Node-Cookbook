async function routes(fastify) {
    fastify.get("/", async (request, reply) => {
        return { message: "Hello World!" }
    });
}

module.exports = routes;