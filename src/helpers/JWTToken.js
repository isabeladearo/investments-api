const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, SECRET, jwtConfig);
    return decoded;
  } catch (error) {
    return false;
  }
};

module.exports = { generateJWTToken, authenticateToken };
