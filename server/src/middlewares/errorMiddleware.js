function errorMiddleware(error, req, res, next) {
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message, data: error.data });
}

exports.errorMiddleware = errorMiddleware;