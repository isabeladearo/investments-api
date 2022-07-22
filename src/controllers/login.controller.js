const { StatusCodes } = require('http-status-codes');
const { loginService } = require('../services');

const authenticateLogin = async (req, res) => {
  const token = await loginService.authenticateLogin(req.body);

  return res.status(StatusCodes.OK).json(token);
};

module.exports = { authenticateLogin };
