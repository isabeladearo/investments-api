const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => res
  .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
  .json({ message: err.message });
