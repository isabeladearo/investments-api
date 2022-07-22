const { StatusCodes } = require('http-status-codes');

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) {
    throw { status: StatusCodes.UNAUTHORIZED, message: 'Token não encontrado' };
  }

  try {
    const decoded = await jwt.verify(token, SECRET, jwtConfig);
    return decoded;
  } catch (error) {
    throw { status: StatusCodes.UNAUTHORIZED, message: 'Token expirado ou inválido' };
  }
};

module.exports = { generateJWTToken, authenticateToken };
