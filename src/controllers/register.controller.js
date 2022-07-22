const { registerService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const registerNewClient = async (req, res) => {
  const token = await registerService.registerNewClient(req.body);

  return res.status(StatusCodes.OK).json(token);
};

module.exports = { registerNewClient };