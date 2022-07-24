const { StatusCodes } = require('http-status-codes');
const { authenticateToken } = require('../../helpers/JWTToken');

const checkBearerToken = (token) => {
  const bearerToken = /\s/g.test(token);
  if (bearerToken) return token.split(' ')[1];
  return token;
};

module.exports = async (req, res, next) => {
  const token = await checkBearerToken(req.headers.authorization);

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });

  const payload = await authenticateToken(token);

  if (!payload) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });

  req.auth = payload.codCliente;

  return next();
};
