const { StatusCodes } = require('http-status-codes');
const { loginService } = require('../services');

const authenticateLogin = async (req, res) => {
  const token = await loginService.authenticateLogin(req.body);

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email ou senha inválida' });

  return res.status(StatusCodes.OK).json(token);
};

module.exports = { authenticateLogin };
