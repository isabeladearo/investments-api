const { StatusCodes } = require('http-status-codes');
const { registerService } = require('../services');

const registerNewClient = async (req, res) => {
  const token = await registerService.registerNewClient(req.body);

  if (!token) return res.status(StatusCodes.CONFLICT).json({ message: 'Cliente já cadastrado' });

  return res.status(StatusCodes.OK).json(token);
};

module.exports = { registerNewClient };
