/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} options
 */
async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("test_collection")

  fastify.get("/", async (request, reply) => ({
    hello: "world",
  }))

  fastify.get("/animals", async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error("No documents found")
    }
    return result
  })

  fastify.get("/animals/:animal", async (request, reply) => {
    const result = await collection.findOne({
      animal: request.params.animal,
    })
    if (!result) {
      throw new Error("Invalid value")
    }
    return result
  })

  const animalBodyJsonSchema = {
    type: "object",
    required: ["animal"],
    properties: {
      animal: {
        type: "string",
      },
    },
  }

  fastify.post(
    "/animals",
    {
      schema: {
        body: animalBodyJsonSchema,
      },
    },
    async (request, reply) => {
      const result = await collection.insertOne({
        animal: request.body.animal,
      })

      return result
    }
  )
}

export default routes
