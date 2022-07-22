const { authenticateToken } = require('../../helpers/JWTToken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  const payload = await authenticateToken(token);

  res.locals.auth = payload;

  next();
};
