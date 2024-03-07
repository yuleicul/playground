import fastify from "fastify"
import test from "tape"
import app from "./app.js"

test("hello world", async ({ deepEqual }) => {
  const server = fastify()
  server.register(app)

  const res = await server.inject("/")

  deepEqual(res.json(), { hello: "world" })

  await server.close()
})
