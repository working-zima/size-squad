function errorMiddleware(error, req, res, next) {
  if (error.name === 'TokenExpiredError') {
    error.statusCode = 401;
    error.message = 'TokenExpired';
  }
  console.log(`errorMiddleware`, error)
  // Internal Server Error 서버 내부 문제 발생 응답 코드
  const status = error.statusCode || 500;

  res.status(status).json({ message: error.message, data: error.data });
}

exports.errorMiddleware = errorMiddleware;