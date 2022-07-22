const investmentsMiddleware = require('./investments.middleware');
const accountMiddleware = require('./account.middleware');
const loginMiddleware = require('./login.middleware');
const registerMiddleware = require('./register.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = {
  investmentsMiddleware,
  accountMiddleware,
  loginMiddleware,
  registerMiddleware,
  authMiddleware,
};
