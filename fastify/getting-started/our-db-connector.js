import fastifyPlugin from "fastify-plugin"
import fastifyMongodb from "@fastify/mongodb"

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} options
 */
async function dbConnector(fastify, options) {
  fastify.register(fastifyMongodb, {
    url: "mongodb://localhost:27017/test_database",
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
