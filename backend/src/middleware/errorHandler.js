export const notFound = (req, res, next) => {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Handle Mongoose CastError (invalid ObjectId)
  let message = err.message;
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found: invalid ID format';
  }

  // Handle Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `An account or record with this ${field} already exists.`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

