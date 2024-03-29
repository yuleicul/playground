import Fastify from "fastify"
import ourDbConnector from "./our-db-connector.js"
import routes from "./our-first-route.js"

const fastify = Fastify({
  logger: true,
})

fastify.register(ourDbConnector)
fastify.register(routes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
