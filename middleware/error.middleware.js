const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Check if the error has a custom status code (e.g., for validation or authentication errors)
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development mode
  });
};

export default errorHandler;
