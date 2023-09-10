const errorHandler = (error, _, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode // "500" is a server err code

  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack, // If this production app then don't show err
  })
}

module.exports = { errorHandler }