import fastify from "fastify"
import appRoutes from "./app.js"

const app = fastify({
  logger: true,
})

app.register(appRoutes)

app.listen(3000)
