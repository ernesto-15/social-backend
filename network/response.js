module.exports.success = (req, res, message = '', status = 200) => {
  res.status(status).send({
    error: false,
    status,
    body: message
  })
}

module.exports.error = (req, res, message = 'Internal Server Error', status = 500) => {
  res.status(status).send({
    error: false,
    status,
    body: message
  })
}