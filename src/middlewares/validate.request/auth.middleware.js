const { StatusCodes } = require('http-status-codes');
const { authenticateToken } = require('../../helpers/JWTToken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });

  const payload = await authenticateToken(token);

  if (!payload) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });

  res.locals.auth = payload;

  return next();
};
