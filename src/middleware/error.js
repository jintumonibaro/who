
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes 
  console.error(err);

// Set a default status code and message
let statusCode = err.statusCode || 500;
let message = err.message || 'Something went wrong on the server.';

// Handle specific types of errors
if (err.name === 'JsonWebTokenError') {
  statusCode = 401;
  message = 'Invalid token.';
} else if (err.name === 'TokenExpiredError') {
  statusCode = 401;
  message = 'Token has expired.';
}
// Add more specific error handlers here, e.g., for validation errors (Zod, etc.)
// For example, if using Zod for validation errors:
// if (err instanceof ZodError) {
//   statusCode = 400;
//   message = err.errors.map(e => e.message).join(', ');
// }
// You can also handle PrismaClientKnownRequestError for DB conflicts, etc.

  // Send the error response
  res.status(statusCode).json({
    message: message,
    // In development, you might want to send the full error stack for debugging
    // In production, avoid sending stack traces to clients for security reasons
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = { errorHandler };