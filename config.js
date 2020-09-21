module.exports = {
  api: {
    port: process.env.API_PORT || 8080
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  }
}