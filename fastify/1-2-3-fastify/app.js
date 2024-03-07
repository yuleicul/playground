import { join } from "desm"
import autoload from "fastify-autoload"
import JWT from "fastify-jwt"

export default async function (app, opts) {
  app.register(JWT, {
    secret: "CHANGEME",
  })

  app.decorate("authenticate", async function (req, reply) {
    try {
      await req.jwtVerify()
    } catch (error) {
      reply.send(error)
    }
  })

  app.register(autoload, {
    dir: join(import.meta.url, "routes"),
  })
}
