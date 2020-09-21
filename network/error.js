const response = require('./response')

//General errors
function error(err, req, res, next) {
  console.error('[error]', err)
  const message = err.message || 'Internal server Error'
  const status = err.statusCode || 500
  response.error(req, res, message, status)
}

//Route not found error
function notFound(req, res, next) {
  console.error('Route not found')
  response.error(req, res, `Route ${req.originalUrl} not found`, 404)
}
module.exports = {
  error,
  notFound
}