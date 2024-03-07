export default async function (app, opts) {
  app.addHook("onRequest", app.authenticate)

  app.get("/", async (req, reply) => {
    return "this is authenticated"
  })
}
