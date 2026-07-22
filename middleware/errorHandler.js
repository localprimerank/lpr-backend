const errorHandler = (err, req, res, next) => {
  // Log the error stack in terminal for debugging
  console.error(err.stack);

  // If Mongoose validation fails (e.g., missing required fields)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(' ');
    return res.status(400).json({ success: false, error: message });
  }

  // If Mongoose receives a broken/wrong ID format
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid resource ID pattern' });
  }

  // Default server fallback error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
};

module.exports = { errorHandler };