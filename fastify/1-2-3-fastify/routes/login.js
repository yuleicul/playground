import errors from "http-errors"
import S from "fluent-schema"

export default async function login(app, opts) {
  const schema = {
    body: S.object().prop("username", S.string().required()).prop("password", S.string().required()),
  }

  app.post("/login", schema, async function (req, reply) {
    const { username, password } = req.body
    if (username !== "yulei" && password !== "chen") {
      throw new errors.Unauthorized()
    }

    const token = app.jwt.sign({ username })

    return { token }
  })
}
